import { ApplicationEntity } from '@module/application/application.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GroupBaseInterface } from './group.types';

@Entity('group')
export class GroupEntity implements GroupBaseInterface {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => ApplicationEntity, (application) => application.group, {
    eager: true,
  })
  applications: ApplicationEntity[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column()
  isArchived: boolean;
}
