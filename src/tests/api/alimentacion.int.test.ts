import request from 'supertest';
import { truncateHospedajeTables, sleep } from '../test-utils';

describe('Alimentacion API integration', () => {
  beforeEach(() => {
    truncateHospedajeTables();
  });

  afterEach(() => {
    truncateHospedajeTables();
  });

  it('should create and fetch alimentacion for a hospedaje', async () => {
    const base = 'http://127.0.0.1:4000';

    // Primero crear un hospedaje de prueba
    const createHosp = await request(base)
      .post('/api/hospedajes')
      .send({ name: 'Aloj Test', address: 'Calle A', zone_id: null, guide_id: null, description: 'para alimentacion' })
      .set('Accept', 'application/json');
    expect(createHosp.status).toBe(201);
    const hospedajeId = createHosp.body.data.id;

    // Crear opción de alimentacion
    const createAl = await request(base)
      .post(`/api/hospedajes/${hospedajeId}/alimentacion`)
      .send({ type: 'desayuno', price: 5.5, notes: 'continental' })
      .set('Accept', 'application/json');

    expect(createAl.status).toBe(201);
    expect(createAl.body).toHaveProperty('data');
    const alimentacionId = createAl.body.data.id;

    // pequeña espera por consistencia
    await sleep(50);

    // Obtener lista
    const list = await request(base).get(`/api/hospedajes/${hospedajeId}/alimentacion`);
    expect(list.status).toBe(200);
    expect(Array.isArray(list.body.data)).toBe(true);

    // Obtener por id
    const getOne = await request(base).get(`/api/hospedajes/${hospedajeId}/alimentacion/${alimentacionId}`);
    expect(getOne.status).toBe(200);
    expect(getOne.body.data.id).toBe(alimentacionId);
  });
});
