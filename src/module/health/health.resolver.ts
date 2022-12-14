import { ConfigService } from '@config';
import { Resolver, Query } from '@nestjs/graphql';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { HealthType } from './health.type';

@Resolver(() => HealthType)
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    @InjectConnection()
    private defaultConnection: Connection,
    private configService: ConfigService,
  ) {}

  @Query(() => HealthType)
  async healthCheck() {
    const healthCheck = await this.health.check([
      () =>
        this.db.pingCheck('database', { connection: this.defaultConnection }),
    ]);

    return {
      version: this.configService.appVersion,
      databaseRunning: healthCheck.info.database.status === 'up',
    } as HealthType;
  }
}
