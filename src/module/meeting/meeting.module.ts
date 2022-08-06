import { PersonModule } from '@module/person/person.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingEntity } from './meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingEntity]), PersonModule],
})
export class MeetingModule {}
