import { ApplicationEntity } from '@module/application/application.entity';
import { ApplicationService } from '@module/application/application.service';
import { Logger } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GroupEntity } from './group.entity';
import { GroupService } from './group.service';
import { CreateGroupInput, GroupType, UpdateGroupInput } from './group.types';

@Resolver(() => GroupType)
export class GroupResolver {
  private readonly logger = new Logger(GroupResolver.name);

  constructor(
    private readonly groupService: GroupService,
    private readonly applicationsService: ApplicationService,
  ) {}

  @Query(() => [GroupType])
  async groups(): Promise<GroupType[]> {
    this.logger.debug('get all groups');
    return await this.groupService.getAll();
  }

  @Query(() => GroupType)
  async group(@Args('id') id: string): Promise<GroupType> {
    this.logger.debug(`get group by id ${id}`);
    return await this.groupService.getById(id);
  }

  @Mutation(() => GroupType)
  async createGroup(
    @Args('input') input: CreateGroupInput,
  ): Promise<GroupType> {
    this.logger.debug('create group');
    return await this.groupService.create(input);
  }

  @Mutation(() => GroupType)
  async updateGroup(
    @Args('id') id: string,
    @Args('input') input: UpdateGroupInput,
  ): Promise<GroupType> {
    this.logger.debug(`update group by id ${id}`);
    return await this.groupService.update(id, input);
  }

  @Mutation(() => Boolean)
  async archiveGroup(@Args('id') id: string): Promise<boolean> {
    this.logger.debug(`archive group by id ${id}`);
    return await this.groupService.archive(id);
  }

  @Mutation(() => Boolean)
  async unarchiveGroup(@Args('id') id: string): Promise<boolean> {
    this.logger.debug(`unarchive group by id ${id}`);
    return await this.groupService.unarchive(id);
  }

  @Mutation(() => Boolean)
  async deleteGroup(@Args('id') id: string): Promise<boolean> {
    this.logger.debug(`delete group by id ${id}`);
    await this.applicationsService.deleteByGroupId(id);
    return await this.groupService.delete(id);
  }

  //parent is any because if I set it to GroupEntity its undefined, dont know why
  @ResolveField()
  async applications(@Parent() parent: any): Promise<ApplicationEntity[]> {
    const group: GroupEntity = parent;
    this.logger.debug(`get applications for group id ${group.id}`);
    return await this.applicationsService.getByGroupId(group.id);
  }
}
