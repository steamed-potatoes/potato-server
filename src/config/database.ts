import { getConnectionOptions, createConnection } from 'typeorm';
import config from './index';

export default async function createDatabaseConnection() {
  try {
    const connectionOptions = await getConnectionOptions(config.server.env);
    await createConnection({ ...connectionOptions, name: 'default' });
  } catch (error) {
    console.error(error);
  }
}
