import { ApplicationEntity } from '@module/application/application.entity';
import { StateEnum, StatusInterface } from '@shared/types';
import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';

@Entity('status')
@Unique(['state', 'application'])
export class StatusEntity implements StatusInterface {
  @PrimaryColumn()
  id: string;

  @Column()
  state: StateEnum;

  @Column({ nullable: true })
  date: Date;

  @ManyToOne(() => ApplicationEntity, (application) => application.status)
  application: ApplicationEntity;
}
