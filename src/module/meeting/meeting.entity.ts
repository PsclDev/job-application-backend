import { ApplicationEntity } from '@module/application/application.entity';
import { MeetingInterface, PersonInterface } from '@shared/types';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('meeting')
export class MeetingEntity implements MeetingInterface {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  date: Date;

  @Column({ type: 'json', nullable: true })
  attendees: PersonInterface[];

  @Column()
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ApplicationEntity, (application) => application.meetings, {
    nullable: true,
  })
  @Exclude()
  application: ApplicationEntity;
}
