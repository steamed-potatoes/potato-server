import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

const config = {
  server: {
    port: process.env.PORT || 8000,
    env: process.env.NODE_ENV || 'local',
  },
  database: {
    dialect: process.env.DB_DIALECT || 'mysql',
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
  },
  jwt: {
    secretKey: process.env.TOKEN_SECRET_KEY,
    issuer: 'potato-diary',
    expiresIn: '60m',
  },
};

export default config;
