import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from './application.entity';
import { ApplicationResolver } from './application.resolver';
import { ApplicationService } from './application.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntity])],
  providers: [ApplicationResolver, ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
