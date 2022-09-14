import { ApplicationEntity } from '@module/application/application.entity';
import { GroupEntity } from '@module/group/group.entity';
import { FileInterface } from '@shared/types';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('file')
export class FileEntity implements FileInterface {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  groupId: string;

  @Column({ nullable: true })
  applicationId: string;

  @Column()
  name: string;

  @Column()
  extension: string;

  @Column()
  data: string;

  @Column()
  size: number;

  @Column()
  mime: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => GroupEntity, (group) => group.files, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'group_id' })
  @Exclude()
  group: GroupEntity;

  @ManyToOne(() => ApplicationEntity, (application) => application.files, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'application_id' })
  @Exclude()
  application: ApplicationEntity;
}
