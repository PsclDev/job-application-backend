import { FileModule } from '@module/file/file.module';
import { MeetingModule } from '@module/meeting/meeting.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from './application.entity';
import { ApplicationResolver } from './application.resolver';
import { ApplicationService } from './application.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationEntity]),
    FileModule,
    MeetingModule,
  ],
  providers: [ApplicationResolver, ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
