import { CacheModule, Module } from '@nestjs/common';
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

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: async (config: ConfigService) => ({
        ttl: config.cacheOptions.ttl,
      }),
      inject: [ConfigService],
    }),
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
  ],
  controllers: [],
})
export class AppModule {}
