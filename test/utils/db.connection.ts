import Container from 'typedi';
import { createConnection, Connection, useContainer } from 'typeorm';

export default async (): Promise<Connection> => {
  useContainer(Container);
  try {
    return await createConnection({
      name: 'default',
      type: 'better-sqlite3',
      database: ':memory:',
      entities: ['src/domains/*/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
      dropSchema: true,
    });
  } catch (error) {
    console.error(error);
  }
};
