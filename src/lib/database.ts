// Configuración de bases de datos para Tourist Guides App
import { MongoClient } from 'mongodb'
import { Pool } from 'pg'

// Configuración MongoDB (DataMart)
const mongoUri = process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017/tourist_guides_datamart?authSource=admin'

let mongoClient: MongoClient | null = null

export async function connectMongoDB() {
  if (!mongoClient) {
    mongoClient = new MongoClient(mongoUri)
    await mongoClient.connect()
    console.log('✅ Conectado a MongoDB')
  }
  return mongoClient.db('tourist_guides_datamart')
}

export async function disconnectMongoDB() {
  if (mongoClient) {
    await mongoClient.close()
    mongoClient = null
    console.log('❌ Desconectado de MongoDB')
  }
}

// Configuración PostgreSQL (Transaccional)
const postgresConfig = {
  connectionString: process.env.POSTGRES_URL || 'postgresql://postgres:password@localhost:5432/tourist_guides_db',
  // Controlar SSL vía POSTGRES_SSL (valor 'true' para habilitar). Por defecto false.
  ssl: (process.env.POSTGRES_SSL === 'true') ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

let postgresPool: Pool | null = null

export function getPostgresPool() {
  if (!postgresPool) {
    postgresPool = new Pool(postgresConfig)
    console.log('✅ Pool de PostgreSQL creado')
  }
  return postgresPool
}

export async function disconnectPostgreSQL() {
  if (postgresPool) {
    await postgresPool.end()
    postgresPool = null
    console.log('❌ Pool de PostgreSQL cerrado')
  }
}

// Funciones helper para operaciones comunes
export async function executeQuery(query: string, params: any[] = []) {
  const pool = getPostgresPool()
  const client = await pool.connect()
  try {
    const result = await client.query(query, params)
    return result
  } finally {
    client.release()
  }
}

export async function executeTransaction(queries: Array<{ query: string; params: any[] }>) {
  const pool = getPostgresPool()
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const results = []
    for (const { query, params } of queries) {
      const result = await client.query(query, params)
      results.push(result)
    }
    await client.query('COMMIT')
    return results
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

// Health check functions
export async function checkDatabaseConnections() {
  const status = {
    mongodb: false,
    postgresql: false,
    timestamp: new Date().toISOString()
  }

  try {
    await connectMongoDB()
    status.mongodb = true
  } catch (error) {
    console.error('Error conectando a MongoDB:', error)
  }

  try {
    await executeQuery('SELECT 1')
    status.postgresql = true
  } catch (error) {
    console.error('Error conectando a PostgreSQL:', error)
  }

  return status
}
