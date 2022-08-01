import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.resolver';

@Module({
  imports: [TerminusModule],
  providers: [HealthController],
})
export class HealthModule {}
