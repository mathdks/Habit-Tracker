import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  type: process.env.DB_TYPE,
}));
