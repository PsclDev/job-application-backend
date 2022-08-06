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

@Entity('application')
export class FileEntity implements FileInterface {
  @PrimaryColumn()
  id: string;

  @Column()
  fileName: string;

  @Column()
  fileSize: number;

  @Column()
  mimeType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ApplicationEntity, (application) => application.files, {
    nullable: true,
  })
  @Exclude()
  application: ApplicationEntity;
}
