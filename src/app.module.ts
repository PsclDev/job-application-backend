import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule, ConfigService } from '@config';
import {
  ApplicationModule,
  FileModule,
  GroupModule,
  HealthModule,
  MeetingModule,
} from '@module';
import {
  ServeStaticModule,
  ServeStaticModuleOptions,
} from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.database.host,
        port: config.database.port,
        username: config.database.user,
        password: config.database.pass,
        database: config.database.name,
        entities: [config.database.entitiesPath],
        synchronize: config.database.synchronize,
        migrationsRun: config.database.migrationsRun,
        migrations: [config.database.migrationsPath],
        logging: config.database.logging,
        cli: {
          migrationsDir: 'src/migrations',
        },
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    GroupModule,
    ApplicationModule,
    FileModule,
    MeetingModule,
    ServeStaticModule.forRootAsync({
      useFactory: (config: ConfigService) =>
        [
          {
            rootPath: config.file.tempData,
            serveRoot: config.file.servePath,
          },
        ] as ServeStaticModuleOptions[],
      inject: [ConfigService],
    }),
  ],
  controllers: [],
})
export class AppModule {}
