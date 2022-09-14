import { ApplicationEntity } from '@module/application/application.entity';
import { MeetingInterface, PersonInterface } from '@shared/types';
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

@Entity('meeting')
export class MeetingEntity implements MeetingInterface {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  date: Date;

  @Column({ type: 'jsonb' })
  attendees: PersonInterface[];

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  link: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  applicationId: string;

  @ManyToOne(() => ApplicationEntity, (application) => application.meetings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'application_id' })
  @Exclude()
  application: ApplicationEntity;
}
