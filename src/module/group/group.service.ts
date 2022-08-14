import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateId, prettyPrintObject, checkAffectedResult } from '@util';
import { Repository } from 'typeorm';
import { GroupEntity } from './group.entity';
import { CreateGroupInput, UpdateGroupInput } from './group.types';

@Injectable()
export class GroupService {
  private readonly moduleName = 'group';
  private readonly logger = new Logger(GroupService.name);

  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepo: Repository<GroupEntity>,
  ) {}

  async getAll(): Promise<GroupEntity[]> {
    this.logger.log('get all groups');
    return this.groupRepo.find();
  }

  async getById(id: string): Promise<GroupEntity> {
    this.logger.log(`get group by id ${id}`);
    const group = await this.groupRepo.findOne({ id });

    if (!group) throw new NotFoundException('no group found by give id');

    return group;
  }

  async create(input: CreateGroupInput): Promise<GroupEntity> {
    this.logger.log('create group');
    prettyPrintObject(this.logger, 'createGroupInput:', input);

    const group = this.groupRepo.create({
      id: generateId<GroupEntity>(this.groupRepo),
      ...input,
    });

    return await this.groupRepo.save(group);
  }

  async update(id: string, input: UpdateGroupInput): Promise<GroupEntity> {
    this.logger.log(`update group by id ${id}`);
    prettyPrintObject(this.logger, 'updateGroupInput:', input);

    const res = await this.groupRepo.update(id, input);
    checkAffectedResult(this.moduleName, res);

    return await this.getById(id);
  }

  async archive(id: string): Promise<boolean> {
    this.logger.log(`archive group by id ${id}`);

    const res = await this.groupRepo.update(id, { isArchived: true });
    checkAffectedResult(this.moduleName, res);

    return res.affected === 1;
  }

  async unarchive(id: string): Promise<boolean> {
    this.logger.log(`unarchive group by id ${id}`);

    const res = await this.groupRepo.update(id, { isArchived: false });
    checkAffectedResult(this.moduleName, res);

    return res.affected === 1;
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`delete group by id ${id}`);

    const res = await this.groupRepo.delete({ id });
    checkAffectedResult(this.moduleName, res);

    return res.affected === 1;
  }
}
