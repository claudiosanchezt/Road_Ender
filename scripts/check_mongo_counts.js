const { MongoClient } = require('mongodb');
(async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://admin:password@mongodb:27017/tourist_guides_datamart?authSource=admin';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('tourist_guides_datamart');
    const hospedajes = await db.collection('hospedajes').countDocuments();
    const alimentacion = await db.collection('alimentacion_options').countDocuments();
    console.log('hospedajes:', hospedajes);
    console.log('alimentacion_options:', alimentacion);
  } catch (e) {
    console.error('error', e);
    process.exit(2);
  } finally {
    await client.close();
  }
})();
