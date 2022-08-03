import { ApplicationModule } from '@module/application/application.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './group.entity';
import { GroupResolver } from './group.resolver';
import { GroupService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity]), ApplicationModule],
  providers: [GroupResolver, GroupService],
})
export class GroupModule {}
