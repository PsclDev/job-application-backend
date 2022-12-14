import { MeetingService } from '@module/meeting/meeting.service';
import { CreateStatusInput } from '@module/status/status.types';
import { Logger } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ApplicationEntity } from './application.entity';
import { ApplicationService } from './application.service';
import {
  ApplicationType,
  CreateApplicationInput,
  UpdateApplicationInput,
} from './application.types';

@Resolver(() => ApplicationType)
export class ApplicationResolver {
  private readonly logger = new Logger(ApplicationResolver.name);

  constructor(
    private readonly applicationService: ApplicationService,
    private readonly meetingService: MeetingService,
  ) {}

  @Query(() => [ApplicationType])
  async applications(): Promise<ApplicationType[]> {
    this.logger.debug('get all applications');
    return await this.applicationService.getAll();
  }

  @Query(() => ApplicationType)
  async application(@Args('id') id: string): Promise<ApplicationType> {
    this.logger.debug(`get application by id ${id}`);
    return await this.applicationService.getById(id);
  }

  @Query(() => [ApplicationType])
  async applicationsByGroupId(
    @Args('groupId') groupId: string,
  ): Promise<ApplicationType[]> {
    this.logger.debug(`get applications by group id ${groupId}`);
    return await this.applicationService.getByGroupId(groupId);
  }

  @Mutation(() => ApplicationType)
  async createApplication(
    @Args('input') input: CreateApplicationInput,
  ): Promise<ApplicationType> {
    this.logger.debug('create application');
    return await this.applicationService.create(input);
  }

  @Mutation(() => ApplicationType)
  async updateApplication(
    @Args('id') id: string,
    @Args('input') input: UpdateApplicationInput,
  ): Promise<ApplicationType> {
    this.logger.debug(`update application by id ${id}`);
    return await this.applicationService.update(id, input);
  }

  @Mutation(() => ApplicationType)
  async updateApplicationNotes(
    @Args('id') id: string,
    @Args('notes') notes: string,
  ): Promise<ApplicationType> {
    this.logger.debug(`update application notes by id ${id}`);
    return await this.applicationService.updateNotes(id, notes);
  }

  @Mutation(() => ApplicationType)
  async moveApplication(
    @Args('id') id: string,
    @Args('newGroupId') newGroupId: string,
  ): Promise<ApplicationType> {
    this.logger.debug(
      `move application by id ${id} into new group id ${newGroupId}`,
    );
    return await this.applicationService.move(id, newGroupId);
  }

  @Mutation(() => Boolean)
  async archiveApplication(@Args('id') id: string): Promise<boolean> {
    this.logger.debug(`archive application by id ${id}`);
    return await this.applicationService.archive(id);
  }

  @Mutation(() => Boolean)
  async unarchiveApplication(@Args('id') id: string): Promise<boolean> {
    this.logger.debug(`unarchive application by id ${id}`);
    return await this.applicationService.unarchive(id);
  }

  @Mutation(() => Boolean)
  async updateStatus(
    @Args('id') id: string,
    @Args('input') input: CreateStatusInput,
  ): Promise<boolean> {
    this.logger.debug('update status');
    return await this.applicationService.updateStatus(id, input);
  }

  @Mutation(() => Boolean)
  async deleteApplication(@Args('id') id: string): Promise<boolean> {
    this.logger.debug(`delete application by id ${id}`);
    return await this.applicationService.delete(id);
  }

  //parent is any because if I set it to GroupEntity its undefined, dont know why
  @ResolveField()
  async meetings(@Parent() parent: any) {
    const application: ApplicationEntity = parent;
    this.logger.debug(`get meetings for application id ${application.id}`);
    return await this.meetingService.getAllByApplicationId(application.id);
  }

  //parent is any because if I set it to GroupEntity its undefined, dont know why
  @ResolveField()
  async files(@Parent() parent: any) {
    const application: ApplicationEntity = parent;
    this.logger.debug(`get files for application id ${application.id}`);
  }
}
