import { ApplicationEntity } from '@module/application/application.entity';
import { FileEntity } from '@module/file/file.entity';
import { GroupInterface } from '@shared/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('group')
export class GroupEntity implements GroupInterface {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => ApplicationEntity, (application) => application.group, {
    eager: true,
    cascade: true,
  })
  applications: ApplicationEntity[];

  @OneToMany(() => FileEntity, (file) => file.group, {
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
