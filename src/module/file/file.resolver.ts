import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { FileService } from './file.service';
import {
  CreateFileInput,
  FileOptions,
  FileType,
  UpdateFileInput,
} from './file.types';

@Resolver(() => FileType)
export class FileResolver {
  private readonly logger = new Logger(FileResolver.name);

  constructor(private readonly fileService: FileService) {}

  @Query(() => FileOptions)
  async fileOptions(): Promise<FileOptions> {
    this.logger.debug('get file options');
    return this.fileService.getFileOptions();
  }

  @Query(() => [FileType])
  async files(): Promise<FileType[]> {
    this.logger.debug('get all files without data');
    return await this.fileService.getAll();
  }

  @Query(() => FileType)
  async file(@Args('id') id: string): Promise<FileType> {
    this.logger.debug(`get file by id ${id}`);
    return await this.fileService.getById(id);
  }

  @Mutation(() => FileType)
  async uploadFile(
    @Args('input') input: CreateFileInput,
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<FileType> {
    this.logger.debug('upload file');
    return await this.fileService.upload(input, file);
  }

  @Mutation(() => FileType)
  async updateFile(
    @Args('id') id: string,
    @Args('input') input: UpdateFileInput,
  ): Promise<FileType> {
    this.logger.debug(`update file by id ${id}`);
    return await this.fileService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteFile(@Args('id') id: string): Promise<boolean> {
    this.logger.debug(`delete file by id ${id}`);
    return await this.fileService.delete(id);
  }
}
