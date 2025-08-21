#!/usr/bin/env node
// Replicador simple: copia tablas seleccionadas de Postgres a MongoDB usando upserts.
// Config via env:
//  - POSTGRES_URL (ej: postgresql://user:pass@host:5432/db)
//  - MONGODB_URI (ej: mongodb://user:pass@host:27017/db)
//  - POLL_INTERVAL_MS (por defecto 60000)
//  - RUN_ONCE (si se establece a '1' el script corre solo una vez)

const { Pool } = require('pg');
const { MongoClient } = require('mongodb');

const POSTGRES_URL = process.env.POSTGRES_URL || process.env.POSTGRES_URL || process.env.POSTGRES || 'postgresql://postgres:password@postgres:5432/tourist_guides_db';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:password@mongodb:27017/tourist_guides_datamart?authSource=admin';
const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS || 60000);
const RUN_ONCE = process.env.RUN_ONCE === '1' || process.env.RUN_ONCE === 'true';

const pool = new Pool({ connectionString: POSTGRES_URL });
let mongoClient;

async function connectMongo() {
  if (!mongoClient) {
    mongoClient = new MongoClient(MONGODB_URI);
    await mongoClient.connect();
    console.log('Connected to MongoDB');
  }
  return mongoClient.db('tourist_guides_datamart');
}

async function fetchRows(sql) {
  const client = await pool.connect();
  try {
    const r = await client.query(sql);
    return r.rows;
  } finally {
    client.release();
  }
}

async function tableExists(table) {
  const client = await pool.connect();
  try {
    const res = await client.query(`SELECT to_regclass($1) as exists`, [table]);
    return !!res.rows[0].exists;
  } finally {
    client.release();
  }
}

async function getTableColumns(table) {
  const client = await pool.connect();
  try {
    const res = await client.query(`SELECT column_name FROM information_schema.columns WHERE table_name = $1`, [table]);
    return res.rows.map(r => r.column_name);
  } finally {
    client.release();
  }
}

function normalizeRow(row) {
  const out = {};
  for (const k of Object.keys(row)) {
    const v = row[k];
    if (v instanceof Date) out[k] = v.toISOString();
    else if (typeof v === 'bigint') out[k] = v.toString();
    else out[k] = v;
  }
  return out;
}

async function logReplicationError(db, meta) {
  try {
    const col = db.collection('replication_errors');
    await col.insertOne(Object.assign({ ts: new Date() }, meta));
  } catch (e) {
    console.error('Failed to log replication error', e && e.message ? e.message : e);
  }
}

async function upsertCollection(db, collectionName, rows, idField = 'id') {
  if (!rows || rows.length === 0) return { ok: true, count: 0 };
  const col = db.collection(collectionName);
  const ops = [];
  for (const r of rows) {
    try {
      const doc = normalizeRow(r);
      const id = doc[idField];
      if (id === undefined || id === null) {
        await logReplicationError(db, { collection: collectionName, reason: 'missing_id', row: doc });
        continue;
      }
      ops.push({
        replaceOne: {
          filter: { _id: id },
          replacement: Object.assign({ _id: id }, doc),
          upsert: true
        }
      });
    } catch (err) {
      await logReplicationError(db, { collection: collectionName, reason: 'normalize_failed', error: err && err.message ? err.message : err, row: r });
    }
  }
  if (ops.length === 0) return { ok: true, count: 0 };
  try {
    const res = await col.bulkWrite(ops, { ordered: false });
    return { ok: true, result: res };
  } catch (err) {
    await logReplicationError(db, { collection: collectionName, reason: 'bulk_write_failed', error: err && err.message ? err.message : err });
    return { ok: false, error: err };
  }
}

async function syncOnce() {
  const db = await connectMongo();
  console.log(new Date().toISOString(), 'Starting replication cycle');
  try {
    // Define target mapping: table -> desired columns and collection name
    const tasks = [
      { table: 'users', cols: ['id', 'name', 'email', 'created_at'], col: 'users', idField: 'id' },
      { table: 'guides', cols: ['id', 'user_id', 'bio', 'rating'], col: 'guides', idField: 'id' },
      { table: 'zones', cols: ['id', 'name'], col: 'zones', idField: 'id' },
      { table: 'tourist_places', cols: ['id', 'name', 'zone_id'], col: 'tourist_places', idField: 'id' },
      { table: 'specialties', cols: ['id', 'name'], col: 'specialties', idField: 'id' },
      { table: 'languages', cols: ['id', 'code', 'name'], col: 'languages', idField: 'id' },
      { table: 'bookings', cols: ['id', 'client_id', 'guide_id', 'zone_id', 'tourist_place_id', 'start_at', 'end_at', 'price'], col: 'bookings', idField: 'id' },
      { table: 'reviews', cols: ['id', 'booking_id', 'client_id', 'guide_id', 'rating', 'comment'], col: 'reviews', idField: 'id' },
      { table: 'hospedajes', cols: ['id', 'name', 'address', 'zone_id', 'guide_id', 'description', 'price', 'created_at'], col: 'hospedajes', idField: 'id' },
      { table: 'alimentacion_options', cols: ['id', 'hospedaje_id', 'type', 'price', 'notes'], col: 'alimentacion_options', idField: 'id' }
    ];

    for (const t of tasks) {
      try {
        const exists = await tableExists(t.table);
        if (!exists) {
          console.log(`Skipping ${t.table}: table does not exist`);
          await logReplicationError(db, { table: t.table, reason: 'table_missing' });
          continue;
        }
        const availableCols = await getTableColumns(t.table);
        const selectedCols = t.cols.filter(c => availableCols.includes(c));
        if (selectedCols.length === 0) {
          console.log(`Skipping ${t.table}: no matching columns found`);
          await logReplicationError(db, { table: t.table, reason: 'no_columns' });
          continue;
        }
        const sql = `SELECT ${selectedCols.join(', ')} FROM ${t.table}`;
        const rows = await fetchRows(sql);
        console.log(`Fetched ${rows.length} rows for ${t.col} (using columns: ${selectedCols.join(',')})`);
        const res = await upsertCollection(db, t.col, rows, t.idField);
        if (res.ok) console.log(`Upserted ${t.col}`);
      } catch (err) {
        console.error('Error syncing', t.table, err && err.message ? err.message : err);
        await logReplicationError(db, { table: t.table, reason: 'sync_failed', error: err && err.message ? err.message : err });
      }
    }
    console.log(new Date().toISOString(), 'Replication cycle finished');
  } catch (err) {
    console.error('Replication cycle failed', err && err.message ? err.message : err);
  }
}

async function main() {
  try {
    await pool.connect();
    console.log('Connected to Postgres');
  } catch (e) {
    console.error('Failed to connect to Postgres:', e && e.message ? e.message : e);
    process.exit(1);
  }

  if (RUN_ONCE) {
    await syncOnce();
    process.exit(0);
  }

  // Loop
  while (true) {
    await syncOnce();
    await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
  }
}

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down');
  try { await pool.end(); } catch(e){}
  try { if (mongoClient) await mongoClient.close(); } catch(e){}
  process.exit(0);
});

main().catch(err => {
  console.error('ETL process error', err && err.message ? err.message : err);
  process.exit(1);
});
