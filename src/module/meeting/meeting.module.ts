import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingEntity } from './meeting.entity';
import { MeetingResolver } from './meeting.resolver';
import { MeetingService } from './meeting.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingEntity])],
  providers: [MeetingResolver, MeetingService],
  exports: [MeetingService],
})
export class MeetingModule {}
