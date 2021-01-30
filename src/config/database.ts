import Container from 'typedi';
import { getConnectionOptions, createConnection, useContainer } from 'typeorm';
import config from './index';
import logger from '@src/config/logger';

export default async function createDatabaseConnection() {
  try {
    useContainer(Container);
    const connectionOptions = await getConnectionOptions(config.server.env);
    await createConnection({ ...connectionOptions, name: 'default' });
  } catch (error) {
    logger.error(error);
  }
}
