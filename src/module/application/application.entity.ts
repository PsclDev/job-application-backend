import { GroupEntity } from '@module/group/group.entity';
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
import { ApplicationBaseInterface } from './application.types';

@Entity('application')
export class ApplicationEntity implements ApplicationBaseInterface {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'group_id' })
  groupId: string;

  @ManyToOne(() => GroupEntity, (group) => group.applications)
  @JoinColumn({ name: 'group_id' })
  @Exclude()
  group: ApplicationEntity[];

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  contact: string;

  @Column()
  jobUrl: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  notes: string;

  @Column('text', { array: true, nullable: true })
  files: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  isArchived: boolean;
}
