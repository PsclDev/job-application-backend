import { FileEntity } from '@module/file/file.entity';
import { GroupEntity } from '@module/group/group.entity';
import { MeetingEntity } from '@module/meeting/meeting.entity';
import { PersonEntity } from '@module/person/person.entity';
import { ApplicationInterface, MeetingInterface } from '@shared/types';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('application')
export class ApplicationEntity implements ApplicationInterface {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'group_id' })
  groupId: string;

  @ManyToOne(() => GroupEntity, (group) => group.applications)
  @JoinColumn({ name: 'group_id' })
  @Exclude()
  group: GroupEntity[];

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  company: string;

  @OneToOne(() => PersonEntity, { nullable: true })
  contact: PersonEntity;

  @Column()
  jobUrl: string;

  @Column()
  status: string;

  @OneToMany(() => MeetingEntity, (meeting) => meeting.application, {
    nullable: true,
  })
  meetings: MeetingInterface[];

  @Column({ nullable: true })
  notes: string;

  @OneToMany(() => FileEntity, (file) => file.application, { nullable: true })
  files: FileEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  isArchived: boolean;
}
