import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MeetingEntity } from './meeting.entity';
import { Repository } from 'typeorm';
import { CreateMeetingInput, UpdateMeetingInput } from './meeting.types';
import { generateId, prettyPrintObject, checkAffectedResult } from '@util';

@Injectable()
export class MeetingService {
  private readonly moduleName = 'meeting';
  private readonly logger = new Logger(MeetingService.name);

  constructor(
    @InjectRepository(MeetingEntity)
    private readonly meetingRepo: Repository<MeetingEntity>,
  ) {}

  async getAll(): Promise<MeetingEntity[]> {
    this.logger.log('get all meetings');
    return await this.meetingRepo.find();
  }

  async getAllByApplicationId(applicationId: string): Promise<MeetingEntity[]> {
    this.logger.log(`get meetings by application id ${applicationId}`);
    return await this.meetingRepo.find({ where: { applicationId } });
  }

  async getById(id: string): Promise<MeetingEntity> {
    this.logger.log(`get meeting by id ${id}`);
    const meeting = await this.meetingRepo.findOne({ id });

    if (!meeting) throw new NotFoundException('no meeting found by give id');

    return meeting;
  }

  async create(input: CreateMeetingInput): Promise<MeetingEntity> {
    this.logger.log('create meeting');
    prettyPrintObject(this.logger, 'createMeetingInput:', input);

    const meeting = this.meetingRepo.create({
      id: generateId<MeetingEntity>(this.meetingRepo),
      ...input,
    });

    return await this.meetingRepo.save(meeting);
  }

  async update(id: string, input: UpdateMeetingInput): Promise<MeetingEntity> {
    this.logger.log(`update meeting by id ${id}`);
    prettyPrintObject(this.logger, 'updateMeetingInput:', input);

    const res = await this.meetingRepo.update({ id }, input);
    checkAffectedResult(this.moduleName, res);

    return await this.meetingRepo.findOne({ id });
  }

  async updateNotes(id: string, notes: string): Promise<MeetingEntity> {
    this.logger.log(`update meeting notes by id ${id}`);
    prettyPrintObject(this.logger, 'updateMeetingInput:', notes);

    const res = await this.meetingRepo.update({ id }, { notes });
    checkAffectedResult(this.moduleName, res);

    return await this.meetingRepo.findOne({ id });
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`delete meeting by id ${id}`);

    const res = await this.meetingRepo.delete({ id });
    checkAffectedResult(this.moduleName, res);

    return res.affected === 1;
  }
}
