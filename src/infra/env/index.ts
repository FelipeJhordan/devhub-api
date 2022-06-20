import * as dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

export const defEnvironment = () => ({
  dev: ['.env.dev', '.env'],
  prod: ['.env', '.env.prod'],
});

export const envs = defEnvironment()[NODE_ENV] || '.env';
