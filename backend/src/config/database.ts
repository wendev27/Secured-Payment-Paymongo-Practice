import { Pool } from 'pg';
import { env } from './env';
import pino from 'pino';

const logger = pino({ level: env.LOG_LEVEL });

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    logger.info('Database connection established successfully');
  } catch (error) {
    logger.error('Failed to connect to database:', error);
    throw new Error('Database connection failed - application cannot start');
  }
};
