import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateId } from '@util/generateId';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { GroupEntity } from './group.entity';
import { CreateGroupInput, UpdateGroupInput } from './group.types';

@Injectable()
export class GroupService {
  private readonly logger = new Logger(GroupService.name);

  constructor(
    @InjectRepository(GroupEntity)
    private groupRepo: Repository<GroupEntity>,
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
    this.prettyPrintObject('createGroupInput:', input);

    const group = this.groupRepo.create({
      id: generateId<GroupEntity>(this.groupRepo),
      ...input,
    });

    return await this.groupRepo.save(group);
  }

  async update(id: string, input: UpdateGroupInput): Promise<GroupEntity> {
    this.logger.log(`update group by id ${id}`);
    this.prettyPrintObject('updateGroupInput:', input);

    const res = await this.groupRepo.update(id, input);
    this.checkAffectedResult(res);

    return await this.getById(id);
  }

  async archive(id: string): Promise<boolean> {
    this.logger.log(`archive group by id ${id}`);

    const res = await this.groupRepo.update(id, { isArchived: true });
    this.checkAffectedResult(res);

    return res.affected === 1;
  }

  async unarchive(id: string): Promise<boolean> {
    this.logger.log(`unarchive group by id ${id}`);

    const res = await this.groupRepo.update(id, { isArchived: false });
    this.checkAffectedResult(res);

    return res.affected === 1;
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`delete group by id ${id}`);

    const res = await this.groupRepo.delete({ id });
    this.checkAffectedResult(res);

    return res.affected === 1;
  }

  private prettyPrintObject(msg: string, obj: any) {
    this.logger.debug(msg, JSON.stringify(obj, null, 2));
  }

  private checkAffectedResult(res: UpdateResult | DeleteResult) {
    if (res.affected <= 0) {
      throw new NotFoundException('no group found by give id');
    }
  }
}
