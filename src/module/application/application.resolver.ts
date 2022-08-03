import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApplicationService } from './application.service';
import {
  ApplicationType,
  CreateApplicationInput,
  UpdateApplicationInput,
} from './application.types';

@Resolver(() => ApplicationType)
export class ApplicationResolver {
  private readonly logger = new Logger(ApplicationResolver.name);

  constructor(private readonly applicationService: ApplicationService) {}

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
  async moveApplication(
    @Args('id') id: string,
    @Args('newGroupId') newGroupId: string,
  ): Promise<ApplicationType> {
    this.logger.debug(`update application by id ${id}`);
    return await this.applicationService.move(id, newGroupId);
  }

  @Mutation(() => Boolean)
  async archiveApplication(@Args('id') id: string): Promise<boolean> {
    this.logger.debug(`archive application by id ${id}`);
    return await this.applicationService.archive(id);
  }

  @Mutation(() => ApplicationType)
  async unarchiveApplication(@Args('id') id: string): Promise<ApplicationType> {
    this.logger.debug(`unarchive application by id ${id}`);
    return await this.applicationService.unarchive(id);
  }

  @Mutation(() => Boolean)
  async deleteApplication(@Args('id') id: string): Promise<boolean> {
    this.logger.debug(`delete application by id ${id}`);
    return await this.applicationService.delete(id);
  }
}
