import { StatusEntity } from '@module/status/status.entity';
import { CreateStatusInput } from '@module/status/status.types';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateId, prettyPrintObject, checkAffectedResult } from '@util';
import { Repository } from 'typeorm';
import { ApplicationEntity } from './application.entity';
import {
  CreateApplicationInput,
  UpdateApplicationInput,
} from './application.types';

@Injectable()
export class ApplicationService {
  private readonly moduleName = 'application';
  private readonly logger = new Logger(ApplicationService.name);

  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepo: Repository<ApplicationEntity>,
    @InjectRepository(StatusEntity)
    private readonly statusRepo: Repository<StatusEntity>,
  ) {}

  async getAll(): Promise<ApplicationEntity[]> {
    this.logger.log('get all applications');
    const all = await this.applicationRepo.find();
    return all;
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
    prettyPrintObject(this.logger, 'createApplicationInput:', input);

    const application = this.applicationRepo.create({
      id: generateId<ApplicationEntity>(this.applicationRepo),
      status: input.status.forEach(
        (x: StatusEntity) => (x.id = generateId<StatusEntity>(this.statusRepo)),
      ),
      ...input,
    });

    return await this.applicationRepo.save(application);
  }

  async update(
    id: string,
    input: UpdateApplicationInput,
  ): Promise<ApplicationEntity> {
    this.logger.log(`update application by id ${id}`);
    prettyPrintObject(this.logger, 'updateApplicationInput:', input);

    const res = await this.applicationRepo.update(id, input);
    checkAffectedResult(this.moduleName, res);

    return await this.getById(id);
  }

  async move(id: string, newGroupId: string): Promise<ApplicationEntity> {
    this.logger.log(`move application by id ${id} to group id ${newGroupId}`);

    const res = await this.applicationRepo.update(id, { groupId: newGroupId });
    checkAffectedResult(this.moduleName, res);

    return await this.getById(id);
  }

  async archive(id: string): Promise<boolean> {
    this.logger.log(`archive application by id ${id}`);

    const res = await this.applicationRepo.update(id, { isArchived: true });
    checkAffectedResult(this.moduleName, res);

    return res.affected === 1;
  }

  async unarchive(id: string): Promise<boolean> {
    this.logger.log(`unarchive application by id ${id}`);

    const res = await this.applicationRepo.update(id, { isArchived: false });
    checkAffectedResult(this.moduleName, res);

    return res.affected === 1;
  }

  async updateStatus(id: string, input: CreateStatusInput): Promise<void> {
    const application = await this.getById(id);

    const status = await this.statusRepo.create({
      id: generateId<StatusEntity>(this.statusRepo),
      state: input.state,
      date: input.date,
      application,
    });
    await this.statusRepo.save(status);
  }

  async deleteByGroupId(groupId: string) {
    this.logger.log(`delete all applications by group id ${groupId}`);
    await this.applicationRepo.delete({ groupId });
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`delete application by id ${id}`);

    const res = await this.applicationRepo.delete({ id });
    checkAffectedResult(this.moduleName, res);

    return res.affected === 1;
  }
}
