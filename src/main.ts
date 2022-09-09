import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';
import { ConfigService } from './config';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  if (config.printConfiguration)
    logger.log(`App Configuration: ${JSON.stringify(config, undefined, 2)}`);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      validateCustomDecorators: true,
    }),
  );

  app.use(
    graphqlUploadExpress({ maxFileSize: config.maxFileSize, maxFiles: 1 }),
  );

  const port = config.httpPort;
  await app.listen(port);
  logger.log(`App listening on port: ${port} | version: ${config.appVersion}`);
}
bootstrap();
