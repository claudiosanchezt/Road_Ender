import request from 'supertest';
import { execSync } from 'child_process';
import { truncateHospedajeTables, sleep } from '../test-utils';

// Este test asume que el build produce dist/api/server.js y que la DB de dev está disponible
describe('Hospedaje API integration', () => {
  beforeAll(() => {
    // construir la API (sin fallar si ya está construido)
    try { execSync('npm run api:build', { stdio: 'inherit' }); } catch(e) { /* ignore */ }
  });

  beforeEach(() => {
    truncateHospedajeTables();
  });

  afterEach(() => {
    truncateHospedajeTables();
  });

  it('should create and fetch a hospedaje', async () => {
    const base = 'http://127.0.0.1:4000';

    // crear
    const createResp = await request(base)
      .post('/api/hospedajes')
      .send({ name: 'Int Test Host', address: 'Calle Test', zone_id: null, guide_id: null, description: 'desc' })
      .set('Accept', 'application/json');

    expect(createResp.status).toBe(201);
    expect(createResp.body).toHaveProperty('data');
    expect(createResp.body.data).toHaveProperty('id');

    const id = createResp.body.data.id;

    // pequeña espera por consistencia en entornos lentos
    await sleep(50);

    // obtener
    const getResp = await request(base).get(`/api/hospedajes/${id}`);
    expect(getResp.status).toBe(200);
    expect(getResp.body).toHaveProperty('data');
    expect(getResp.body.data.id).toBe(id);
  });
});
