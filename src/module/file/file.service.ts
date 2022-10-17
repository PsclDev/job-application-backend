import { ConfigService } from '@config/config.service';
import {
  Injectable,
  Logger,
  NotFoundException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkAffectedResult } from '@util/checkAffectedResult';
import { excludeColumns } from '@util/excludeColumns';
import { generateId } from '@util/generateId';
import { prettyPrintObject } from '@util/prettyPrintObject';
import { mkdirSync, existsSync, writeFileSync, unlinkSync } from 'fs';
import { FileUpload } from 'graphql-upload';
import * as path from 'path';
import { FindManyOptions, Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import {
  CreateFileInput,
  FileOptions,
  FileType,
  UpdateFileInput,
} from './file.types';

@Injectable()
export class FileService {
  private readonly moduleName = 'file';
  private readonly logger = new Logger(FileService.name);

  constructor(
    private readonly configServie: ConfigService,
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
  ) {}

  getFileOptions(): FileOptions {
    return this.configServie.file;
  }

  async getAll(): Promise<FileEntity[]> {
    this.logger.log('get all applications');
    const conditions: FindManyOptions<FileEntity> = {
      select: excludeColumns(this.fileRepo, ['data']),
    };

    const all = await this.fileRepo.find(conditions);
    return all;
  }

  async getById(id: string): Promise<FileEntity> {
    this.logger.log(`get application by id ${id}`);
    const file = await this.fileRepo.findOne({ id });

    if (!file) throw new NotFoundException('no file found by give id');

    return file;
  }

  async upload(
    input: CreateFileInput,
    uploadedFile: FileUpload,
  ): Promise<FileType> {
    this.logger.log('upload file');
    prettyPrintObject(this.logger, 'createFileInput:', input);
    prettyPrintObject(this.logger, 'fileUpload:', uploadedFile);

    const allowedExtensions = this.configServie.file.allowedExtensions;
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

  async serve(id: string): Promise<string> {
    try {
      this.logger.log(`trying to serve file id ${id}`);
      const file = await this.getById(id);

      const directory = this.configServie.file.tempData;
      const filename = `${file.name}${file.extension}`;
      const filePath = `${directory}/${filename}`;
      if (!existsSync(directory)) {
        this.logger.log(`creating temp data directoy ${directory}`);
        mkdirSync(directory);
      }

      this.logger.log(`creating temp file ${id}`);
      writeFileSync(filePath, Buffer.from(file.data, 'base64'));

      setTimeout(() => {
        this.deleteTemp(id, filePath);
      }, this.configServie.file.cacheTime);

      return `${this.configServie.file.servePath}/${filename}`;
    } catch (error) {
      throw Error(`Failed to serve file with id ${id}`);
    }
  }

  async update(id: string, input: UpdateFileInput): Promise<FileEntity> {
    this.logger.log(`update file by id ${id}`);
    prettyPrintObject(this.logger, 'updateFileInput:', input);

    const res = await this.fileRepo.update(id, input);
    checkAffectedResult(this.moduleName, res);

    return await this.getById(id);
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`delete file by id ${id}`);

    const res = await this.fileRepo.delete({ id });
    checkAffectedResult(this.moduleName, res);

    return res.affected === 1;
  }

  async deleteTemp(id: string, filePath: string) {
    try {
      this.logger.log(`delete from temp data - file id ${id}`);
      unlinkSync(filePath);
    } catch (error) {
      this.logger.debug(
        `File ${id} could not be found and therefore not deleted`,
      );
    }
  }
}
