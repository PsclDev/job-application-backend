import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateId } from '@util/generateId';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ApplicationEntity } from './application.entity';
import {
  CreateApplicationInput,
  UpdateApplicationInput,
} from './application.types';

@Injectable()
export class ApplicationService {
  private readonly logger = new Logger(ApplicationService.name);

  constructor(
    @InjectRepository(ApplicationEntity)
    private applicationRepo: Repository<ApplicationEntity>,
  ) {}

  async getAll(): Promise<ApplicationEntity[]> {
    this.logger.log('get all applications');
    return this.applicationRepo.find();
  }

  async getById(id: string): Promise<ApplicationEntity> {
    this.logger.log(`get application by id ${id}`);
    const application = await this.applicationRepo.findOne({ id });

    if (!application)
      throw new NotFoundException('no application found by give id');

    return application;
  }

  async getByGroupId(groupId: string): Promise<ApplicationEntity[]> {
    this.logger.log(`get applications by group id ${groupId}`);
    const applications = await this.applicationRepo.find({ groupId });

    if (!applications)
      throw new NotFoundException('no applications found by give group id');

    return applications;
  }

  async create(input: CreateApplicationInput): Promise<ApplicationEntity> {
    this.logger.log('create application');
    this.prettyPrintObject('createApplicationInput:', input);

    const application = this.applicationRepo.create({
      id: generateId<ApplicationEntity>(this.applicationRepo),
      ...input,
    });

    return await this.applicationRepo.save(application);
  }

  async update(
    id: string,
    input: UpdateApplicationInput,
  ): Promise<ApplicationEntity> {
    this.logger.log(`update application by id ${id}`);
    this.prettyPrintObject('updateApplicationInput:', input);

    const res = await this.applicationRepo.update(id, input);
    this.checkAffectedResult(res);

    return await this.getById(id);
  }

  async move(id: string, newGroupId: string): Promise<ApplicationEntity> {
    this.logger.log(`move application by id ${id} to group id ${newGroupId}`);

    const res = await this.applicationRepo.update(id, { groupId: newGroupId });
    this.checkAffectedResult(res);

    return await this.getById(id);
  }

  async archive(id: string): Promise<boolean> {
    this.logger.log(`archive application by id ${id}`);

    const res = await this.applicationRepo.update(id, { isArchived: true });
    this.checkAffectedResult(res);

    return res.affected === 1;
  }

  async unarchive(id: string): Promise<boolean> {
    this.logger.log(`unarchive application by id ${id}`);

    const res = await this.applicationRepo.update(id, { isArchived: false });
    this.checkAffectedResult(res);

    return res.affected === 1;
  }

  async deleteByGroupId(groupId: string) {
    this.logger.log(`delete all applications by group id ${groupId}`);
    await this.applicationRepo.delete({ groupId });
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`delete application by id ${id}`);

    const res = await this.applicationRepo.delete({ id });
    this.checkAffectedResult(res);

    return res.affected === 1;
  }

  private prettyPrintObject(msg: string, obj: any) {
    this.logger.debug(msg, JSON.stringify(obj, null, 2));
  }

  private checkAffectedResult(res: UpdateResult | DeleteResult) {
    if (res.affected <= 0) {
      throw new NotFoundException('no application found by give id');
    }
  }
}
