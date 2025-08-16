import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:password@localhost:27017';

export const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Error conectando a MongoDB:', err);
    process.exit(1);
  }
};

export { MONGO_URI };
