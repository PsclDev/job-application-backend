import { ApplicationEntity } from '@module/application/application.entity';
import { FileInterface } from '@shared/types';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('file')
export class FileEntity implements FileInterface {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  size: number;

  @Column()
  mime: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ApplicationEntity, (application) => application.files)
  @Exclude()
  application: ApplicationEntity;
}
