import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenvExpand = require('dotenv-expand');
import * as Joi from 'joi';
import { join } from 'path';

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
  file: Joi.object().keys({
    maxSize: Joi.number().integer().greater(0).required(),
    allowedExtensions: Joi.array().items(Joi.string()).required(),
    cacheTime: Joi.number().greater(0).required(),
    tempData: Joi.string().required(),
    servePath: Joi.string().required(),
  }),
});

@Injectable()
export class ConfigService {
  appVersion = process.env.app_version || 'unkown';
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
  file = {
    maxSize: calculatemaxSize(Number(process.env.APP_FILE_MAX_SIZE_IN_MB) || 1),
    allowedExtensions: generateAllowedFileExtensions(
      process.env.APP_FILE_ALLOWED_EXTENSIONS ||
        'csv,docx,key,numbers,pages,pdf',
    ),
    cacheTime: minutesToMilliseconds(
      Number(process.env.APP_FILE_CACHE_TIME_IN_MIN) || 15,
    ),
    tempData: join(__dirname, '..', '_tempData'),
    servePath: '/files',
  };
}

function bool(input: string): boolean {
  if (!input) return null;
  return input.toLowerCase() === 'true';
}

function calculatemaxSize(mb: number): number {
  return mb * 1048576;
}

function minutesToMilliseconds(min: number): number {
  return min * 60000;
}

function generateAllowedFileExtensions(extensions: string): string[] {
  return extensions.split(',').map((extension) => `.${extension}`);
}

if (!Boolean(process.env.APP_IS_RUNNING_IN_PIPELINE)) {
  Joi.assert(new ConfigService(), CONFIG_SCHEMA, 'Invalid Configuration');
}
