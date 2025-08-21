#!/usr/bin/env node
const { Pool } = require('pg');

const POSTGRES_URL = process.env.POSTGRES_URL || 'postgresql://postgres:password@postgres:5432/tourist_guides_db';

async function main(){
  const pool = new Pool({ connectionString: POSTGRES_URL });
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Insert two hospedajes
    const insertHosp = 'INSERT INTO hospedajes (name, description, zone_id, guide_id, price) VALUES ($1,$2,$3,$4,$5) RETURNING id';
    const h1 = await client.query(insertHosp, ['Seed Host 1', 'Seeded hospedaje 1', null, null, 10.5]);
    const h2 = await client.query(insertHosp, ['Seed Host 2', 'Seeded hospedaje 2', null, null, 20.0]);
    const id1 = h1.rows[0].id;
    const id2 = h2.rows[0].id;

    // Insert alimentacion options for each
    const insertAl = 'INSERT INTO alimentacion_options (hospedaje_id, type, price, notes) VALUES ($1,$2,$3,$4) RETURNING id';
    const a1 = await client.query(insertAl, [id1, 'desayuno', 5.5, 'continental']);
    const a2 = await client.query(insertAl, [id2, 'media-pension', 12.0, 'almuerzo incluido']);

    await client.query('COMMIT');
    console.log('Seed inserted:', { hospedajes: [id1, id2], alimentacion: [a1.rows[0].id, a2.rows[0].id] });
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Seed failed', e && e.message ? e.message : e);
    process.exit(2);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
