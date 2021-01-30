import config from './src/config';

export default [
  {
    name: 'local',
    type: config.database.dialect,
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    entities: ['./src/domains/*/*.entity{.ts,.js}'],
    synchronize: true,
    logging: false,
  },
  {
    name: 'prod',
    type: config.database.dialect,
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    entities: ['./src/domains/*/*.entity{.ts,.js}'],
    logging: true,
  },
];
