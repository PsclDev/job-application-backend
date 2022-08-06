import { ApplicationEntity } from '@module/application/application.entity';
import { PersonEntity } from '@module/person/person.entity';
import { MeetingInterface } from '@shared/types';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('application')
export class MeetingEntity implements MeetingInterface {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  date: Date;

  @OneToMany(() => PersonEntity, (person) => person.meeting)
  attendees: PersonEntity[];

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
