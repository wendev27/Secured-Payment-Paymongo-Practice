import express from 'express';
import pino from 'pino';
import { env, initializeDatabase } from './config';
import { errorHandler, requestLogger } from './middleware';
import routes from './routes';

const logger = pino({ level: env.LOG_LEVEL });

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use('/api', routes);

app.use(errorHandler);

const startServer = async (): Promise<void> => {
  try {
    await initializeDatabase();
    
    const port = parseInt(env.PORT, 10);
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
      logger.info(`Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
