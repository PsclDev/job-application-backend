import { FileEntity } from '@module/file/file.entity';
import { GroupEntity } from '@module/group/group.entity';
import { MeetingEntity } from '@module/meeting/meeting.entity';
import { StatusEntity } from '@module/status/status.entity';
import {
  ApplicationInterface,
  MeetingInterface,
  PersonInterface,
} from '@shared/types';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('application')
export class ApplicationEntity implements ApplicationInterface {
  @PrimaryColumn()
  id: string;

  @Column()
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

  @Column({ type: 'json', nullable: true })
  contact: PersonInterface;

  @Column()
  jobUrl: string;

  @OneToMany(() => StatusEntity, (status) => status.application, {
    cascade: true,
    eager: true,
  })
  status: StatusEntity[];

  @OneToMany(() => MeetingEntity, (meeting) => meeting.application, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  meetings: MeetingInterface[];

  @Column({ nullable: true })
  notes: string;

  @OneToMany(() => FileEntity, (file) => file.application, {
    cascade: true,
    nullable: true,
  })
  files: FileEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  isArchived: boolean;
}
