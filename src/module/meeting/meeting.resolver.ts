import { Logger } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { MeetingService } from './meeting.service';
import {
  CreateMeetingInput,
  MeetingType,
  UpdateMeetingInput,
} from './meeting.types';

@Resolver(() => MeetingType)
export class MeetingResolver {
  private readonly logger = new Logger(MeetingResolver.name);

  constructor(private readonly meetingService: MeetingService) {}

  @Query(() => [MeetingType])
  async meetings(): Promise<MeetingType[]> {
    this.logger.debug(`get meetings all meetings}`);
    return await this.meetingService.getAll();
  }

  @Query(() => [MeetingType])
  async meetingsByApplicationId(
    @Args('applicationId') applicationId: string,
  ): Promise<MeetingType[]> {
    this.logger.debug(`get meetings by applicationId ${applicationId}`);
    return await this.meetingService.getAllByApplicationId(applicationId);
  }

  @Query(() => MeetingType)
  async meeting(@Args('id') id: string): Promise<MeetingType> {
    this.logger.debug(`get meeting by id ${id}`);
    return await this.meetingService.getById(id);
  }

  @Mutation(() => MeetingType)
  async createMeeting(
    @Args('input') input: CreateMeetingInput,
  ): Promise<MeetingType> {
    this.logger.debug('create meeting');
    return await this.meetingService.create(input);
  }

  @Mutation(() => MeetingType)
  async updateMeeting(
    @Args('id') id: string,
    @Args('input') input: UpdateMeetingInput,
  ): Promise<MeetingType> {
    this.logger.debug(`update meeting by id ${id}`);
    return await this.meetingService.update(id, input);
  }

  @Mutation(() => MeetingType)
  async updateMeetingNotes(
    @Args('id') id: string,
    @Args('notes') notes: string,
  ): Promise<MeetingType> {
    this.logger.debug(`update meeting notes by id ${id}`);
    return await this.meetingService.updateNotes(id, notes);
  }

  @Mutation(() => Boolean)
  async deleteMeeting(@Args('id') id: string): Promise<boolean> {
    this.logger.debug(`delete meeting by id ${id}`);
    return await this.meetingService.delete(id);
  }
}
