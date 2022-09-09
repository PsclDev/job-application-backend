import {
  Injectable,
  Logger,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateId } from '@util/generateId';
import { prettyPrintObject } from '@util/prettyPrintObject';
import { FileUpload } from 'graphql-upload';
import * as path from 'path';
import { Repository } from 'typeorm';
import { allowedExtensions } from './allowedExtensions';
import { FileEntity } from './file.entity';
import { CreateFileInput, FileType } from './file.types';

@Injectable()
export class FileService {
  private readonly moduleName = 'file';
  private readonly logger = new Logger(FileService.name);

  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
  ) {}

  async upload(
    input: CreateFileInput,
    uploadedFile: FileUpload,
  ): Promise<FileType> {
    this.logger.log('upload file');
    prettyPrintObject(this.logger, 'createFileInput:', input);
    prettyPrintObject(this.logger, 'fileUpload:', uploadedFile);

    const parsedFilepath = path.parse(uploadedFile.filename);
    const stream = await uploadedFile.createReadStream();

    if (!allowedExtensions.includes(parsedFilepath.ext)) {
      throw new UnsupportedMediaTypeException(
        `Filetype is not supported (allowed: ${allowedExtensions.join(', ')})`,
      );
    }

    try {
      const chunks = [];
      let chunkBytes = 0;

      const { buffer, size } = await new Promise<{
        buffer: Buffer;
        size: number;
      }>((resolve, reject) => {
        let buffer: Buffer;

        stream.on('data', (chunk) => {
          chunks.push(chunk);
          chunkBytes += chunk.length;
        });

        stream.on('end', () => {
          buffer = Buffer.concat(chunks);
          resolve({ buffer, size: chunkBytes });
        });

        stream.on('error', reject);
      });

      const file = this.fileRepo.create({
        id: generateId<FileEntity>(this.fileRepo),
        ...input,
        name: parsedFilepath.name,
        extension: parsedFilepath.ext,
        data: buffer.toString('base64'),
        size: size,
        mime: uploadedFile.mimetype,
      });

      return await this.fileRepo.save(file);
    } catch (err) {
      this.logger.error('Error uploading file', err);
      return null;
    }
  }
}
