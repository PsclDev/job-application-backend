import { ApplicationEntity } from '@module/application/application.entity';
import { StatusEntity } from '@module/status/status.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusInterface } from '@shared/types';
import { generateId } from '@util/generateId';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
  private readonly moduleName = 'status';
  private readonly logger = new Logger(StatusService.name);

  constructor(
    @InjectRepository(StatusEntity)
    private readonly statusRepo: Repository<StatusEntity>,
  ) {}

  async update(
    application: ApplicationEntity,
    newStatus: StatusInterface,
  ): Promise<StatusEntity[]> {
    if (!newStatus) return;

    this.logger.log(`update status for application id ${application.id}`);
    const status = await this.statusRepo.find({ application });

    if (!status)
      throw new NotFoundException('no status found by give application id');

    if (status.find((x) => x.state === newStatus.state))
      throw new NotFoundException(
        `status already exists for given application, id ${application.id}`,
      );

    status.push({
      id: generateId<StatusEntity>(this.statusRepo),
      application,
      ...newStatus,
    });

    await this.statusRepo.save(status);

    return status;
  }
}
