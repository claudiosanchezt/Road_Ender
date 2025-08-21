import mongoose from 'mongoose';

// Preferir MONGODB_URI (usada en docker-compose) y luego MONGO_URI por compatibilidad
export const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://admin:password@localhost:27017';

export const connectMongo = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Error conectando a MongoDB:', err);
    // No forzar exit en build-time; en runtime la app puede manejar fallos.
  }
};

