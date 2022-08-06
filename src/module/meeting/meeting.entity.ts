import { PersonEntity } from '@module/person/person.entity';
import { MeetingInterface } from '@shared/types';
import {
  Column,
  CreateDateColumn,
  Entity,
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
}
