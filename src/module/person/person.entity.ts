import { PersonInterface } from '@shared/types';
import {
  Column,
  CreateDateColumn,
  Entity,
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
}
