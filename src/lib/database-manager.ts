// 🗄️ Database Connection Manager
// Gestión centralizada de conexiones PostgreSQL y MongoDB

import pg from 'pg';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de bases de datos
const DB_CONFIG = {
  postgresql: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DATABASE || 'tourist_guides_db',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20, // Máximo de conexiones en el pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    database: process.env.MONGODB_DATABASE || 'tourist_guides_analytics',
    options: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  }
};

class DatabaseManager {
  private static instance: DatabaseManager;
  private pgPool: pg.Pool | null = null;
  private mongoClient: MongoClient | null = null;
  private mongoDB: Db | null = null;
  private isConnected = false;

  private constructor() {}

  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  // Inicializar todas las conexiones
  async initialize(): Promise<void> {
    try {
      console.log('🔌 Iniciando conexiones a bases de datos...');
      
      await Promise.all([
        this.initializePostgreSQL(),
        this.initializeMongoDB()
      ]);
      
      this.isConnected = true;
      console.log('✅ Todas las conexiones de base de datos establecidas');
      
      // Configurar manejo de cierre graceful
      this.setupGracefulShutdown();
      
    } catch (error) {
      console.error('❌ Error inicializando bases de datos:', error);
      throw error;
    }
  }

  // Inicializar PostgreSQL
  private async initializePostgreSQL(): Promise<void> {
    try {
      this.pgPool = new pg.Pool(DB_CONFIG.postgresql);
      
      // Test de conexión
      const client = await this.pgPool.connect();
      await client.query('SELECT NOW()');
      client.release();
      
      console.log('✅ PostgreSQL conectado');
      
      // Event listeners para el pool
      this.pgPool.on('error', (err) => {
        console.error('❌ Error en PostgreSQL pool:', err);
      });
      
    } catch (error) {
      console.error('❌ Error conectando a PostgreSQL:', error);
      throw error;
    }
  }

  // Inicializar MongoDB
  private async initializeMongoDB(): Promise<void> {
    try {
      this.mongoClient = new MongoClient(DB_CONFIG.mongodb.uri, DB_CONFIG.mongodb.options);
      await this.mongoClient.connect();
      
      this.mongoDB = this.mongoClient.db(DB_CONFIG.mongodb.database);
      
      // Test de conexión
      await this.mongoDB.admin().ping();
      
      console.log('✅ MongoDB conectado');
      
    } catch (error) {
      console.error('❌ Error conectando a MongoDB:', error);
      throw error;
    }
  }

  // Obtener cliente PostgreSQL
  getPostgreSQLPool(): pg.Pool {
    if (!this.pgPool) {
      throw new Error('PostgreSQL no está inicializado');
    }
    return this.pgPool;
  }

  // Obtener base de datos MongoDB
  getMongoDB(): Db {
    if (!this.mongoDB) {
      throw new Error('MongoDB no está inicializado');
    }
    return this.mongoDB;
  }

  // Verificar estado de conexiones
  async healthCheck(): Promise<{ postgresql: boolean; mongodb: boolean; overall: boolean }> {
    const health = {
      postgresql: false,
      mongodb: false,
      overall: false
    };

    try {
      // Test PostgreSQL
      if (this.pgPool) {
        const client = await this.pgPool.connect();
        await client.query('SELECT 1');
        client.release();
        health.postgresql = true;
      }
    } catch (error) {
      console.error('PostgreSQL health check failed:', error);
    }

    try {
      // Test MongoDB
      if (this.mongoDB) {
        await this.mongoDB.admin().ping();
        health.mongodb = true;
      }
    } catch (error) {
      console.error('MongoDB health check failed:', error);
    }

    health.overall = health.postgresql && health.mongodb;
    return health;
  }

  // Transacción PostgreSQL
  async withTransaction<T>(callback: (client: pg.PoolClient) => Promise<T>): Promise<T> {
    if (!this.pgPool) {
      throw new Error('PostgreSQL no está inicializado');
    }

    const client = await this.pgPool.connect();
    
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Transacción MongoDB
  async withMongoTransaction<T>(callback: (session: any) => Promise<T>): Promise<T> {
    if (!this.mongoClient) {
      throw new Error('MongoDB no está inicializado');
    }

    const session = this.mongoClient.startSession();
    
    try {
      return await session.withTransaction(async () => {
        return await callback(session);
      });
    } finally {
      await session.endSession();
    }
  }

  // Configurar cierre graceful
  private setupGracefulShutdown(): void {
    const shutdown = async (signal: string) => {
      console.log(`\n🔄 Recibida señal ${signal}, cerrando conexiones...`);
      await this.disconnect();
      process.exit(0);
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  }

  // Desconectar todas las bases de datos
  async disconnect(): Promise<void> {
    console.log('🔌 Cerrando conexiones de base de datos...');

    const promises = [];

    if (this.pgPool) {
      promises.push(this.pgPool.end().then(() => {
        console.log('✅ PostgreSQL desconectado');
      }));
    }

    if (this.mongoClient) {
      promises.push(this.mongoClient.close().then(() => {
        console.log('✅ MongoDB desconectado');
      }));
    }

    await Promise.all(promises);
    this.isConnected = false;
    console.log('✅ Todas las conexiones cerradas');
  }

  // Getters para estado
  get connected(): boolean {
    return this.isConnected;
  }
}

// Exportar instancia singleton
export const dbManager = DatabaseManager.getInstance();

// Funciones de conveniencia
export const getPostgreSQLPool = () => dbManager.getPostgreSQLPool();
export const getMongoDB = () => dbManager.getMongoDB();
export const initializeDatabase = () => dbManager.initialize();
export const disconnectDatabase = () => dbManager.disconnect();
export const databaseHealthCheck = () => dbManager.healthCheck();

export default dbManager;
