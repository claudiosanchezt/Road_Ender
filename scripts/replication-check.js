// Lightweight script to inspect Postgres tables and columns used by the ETL.
const { Pool } = require('pg');

const POSTGRES_URL = process.env.POSTGRES_URL || 'postgresql://postgres:password@localhost:5432/tourist_guides_db';

const pool = new Pool({ connectionString: POSTGRES_URL });

async function listCols(table) {
  const res = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name = $1`, [table]);
  return res.rows.map(r => r.column_name);
}

async function exists(table) {
  const res = await pool.query(`SELECT to_regclass($1) as exists`, [table]);
  return !!res.rows[0].exists;
}

async function run() {
  try {
    await pool.connect();
    const tasks = ['users','guides','zones','tourist_places','specialties','languages','bookings','reviews','hospedajes','alimentacion_options'];
    const report = {};
    for (const t of tasks) {
      const e = await exists(t);
      if (!e) { report[t] = { exists: false }; continue; }
      const cols = await listCols(t);
      report[t] = { exists: true, columns: cols };
    }
    console.log(JSON.stringify(report, null, 2));
    process.exit(0);
  } catch (e) {
    console.error('Check failed', e && e.message ? e.message : e);
    process.exit(2);
  } finally {
    try { await pool.end(); } catch(e){}
  }
}

run();
