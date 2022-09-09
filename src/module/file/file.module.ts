import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FileResolver, FileService],
  exports: [FileService],
})
export class FileModule {}
