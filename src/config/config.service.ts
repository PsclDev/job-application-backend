import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenvExpand = require('dotenv-expand');
import * as Joi from 'joi';

dotenvExpand.expand(dotenv.config());

const CONFIG_SCHEMA = Joi.object().keys({
  appVersion: Joi.string().required(),
  nodeEnv: Joi.string().required(),
  devMode: Joi.bool().required(),
  httpPort: Joi.number().integer().greater(0).required(),
  printConfiguration: Joi.bool().optional(),
  database: Joi.object().keys({
    host: Joi.string().required(),
    port: Joi.number().integer().greater(0).required(),
    user: Joi.string().required(),
    pass: Joi.string().required(),
    name: Joi.string().required(),
    entitiesPath: Joi.string().optional(),
    synchronize: Joi.bool().optional(),
    migrationsRun: Joi.bool().optional(),
    migrationsPath: Joi.string().optional(),
    logging: Joi.bool().optional(),
  }),
  useCache: Joi.bool().optional(),
  cacheOptions: Joi.object().keys({
    ttl: Joi.number().integer().greater(0).required(),
  }),
  maxFileSize: Joi.number().integer().greater(0).required(),
});

@Injectable()
export class ConfigService {
  appVersion = process.env.npm_package_version || 'unkown';
  nodeEnv = process.env.NODE_ENV || 'prod';
  devMode = this.nodeEnv === 'dev' || this.nodeEnv === 'development';
  httpPort = Number(process.env.APP_PORT) || 3010;
  printConfiguration = bool(process.env.APP_PRINT_CONFIGURATION) || false;
  database = {
    host: process.env.APP_DB_HOST,
    port: Number(process.env.APP_DB_PORT) || 5432,
    user: process.env.APP_DB_USER,
    pass: process.env.APP_DB_PASS,
    name: process.env.APP_DB_NAME,
    entitiesPath: process.env.APP_MIGRATIONS_PATH || 'dist/**/*.entity.js',
    synchronize: bool(process.env.APP_DB_SYNCHRONIZE) || false,
    migrationsRun: bool(process.env.APP_RUN_MIGRATIONS) || true,
    migrationsPath: process.env.APP_MIGRATIONS_PATH || 'dist/migrations/*.js',
    logging: bool(process.env.APP_DB_LOGGING) || false,
  };
  useCache = bool(process.env.APP_USE_CACHE) || false;
  cacheOptions = {
    ttl: Number(process.env.APP_CACHE_TTL) || 60 * 60, //1 hour
  };
  maxFileSize = calculateMaxFileSize(
    Number(process.env.APP_MAX_FILE_SIZE_IN_MB) || 1,
  );
}

function bool(input: string): boolean {
  if (!input) return null;
  return input.toLowerCase() === 'true';
}

function calculateMaxFileSize(mb: number): number {
  return mb * 1048576;
}

if (!Boolean(process.env.APP_IS_RUNNING_IN_PIPELINE)) {
  Joi.assert(new ConfigService(), CONFIG_SCHEMA, 'Invalid Configuration');
}
