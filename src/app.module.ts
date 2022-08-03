import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@config';
import { HealthModule } from './module/health/health.module';
import { GroupModule } from './module/group/group.module';
import { ApplicationModule } from './module/application/application.module';

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
        cli: {
          migrationsDir: 'src/migrations',
        },
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    GroupModule,
    ApplicationModule,
  ],
  controllers: [],
})
export class AppModule {}
