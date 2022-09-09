import { Logger } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { FileService } from './file.service';
import { CreateFileInput, FileType } from './file.types';

@Resolver(() => FileType)
export class FileResolver {
  private readonly logger = new Logger(FileResolver.name);

  constructor(private readonly fileService: FileService) {}

  @Mutation(() => FileType)
  async uploadFile(
    @Args('input') input: CreateFileInput,
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<FileType> {
    this.logger.debug('upload file');
    return await this.fileService.upload(input, file);
  }
}
