import { MeetingEntity } from '@module/meeting/meeting.entity';
import { PersonInterface } from '@shared/types';
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
export class PersonEntity implements PersonInterface {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  position: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => MeetingEntity, (meeting) => meeting.attendees, {
    nullable: true,
  })
  @Exclude()
  meeting: MeetingEntity;
}
