import { FileModule } from '@module/file/file.module';
import { MeetingModule } from '@module/meeting/meeting.module';
import { StatusEntity } from '@module/status/status.entity';
import { StatusService } from '@module/status/status.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from './application.entity';
import { ApplicationResolver } from './application.resolver';
import { ApplicationService } from './application.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationEntity, StatusEntity]),
    FileModule,
    MeetingModule,
  ],
  providers: [ApplicationResolver, ApplicationService, StatusService],
  exports: [ApplicationService, StatusService],
})
export class ApplicationModule {}
