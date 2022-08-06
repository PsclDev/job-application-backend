import { ObjectType, Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { FileInterface, PersonInterface } from '@shared/types';
import { IsString, MinLength } from 'class-validator';

@ObjectType('File')
export class FileType implements FileInterface {
  @Field(() => ID)
  id: string;

  @Field()
  fileName: string;

  @Field(() => Number)
  fileSize: number;

  @Field()
  mimeType: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateFileInput
  implements Omit<FileInterface, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @MinLength(3)
  @Field()
  fileName: string;

  @Field(() => Number)
  fileSize: number;

  @IsString()
  @MinLength(3)
  @Field()
  mimeType: string;
}

@InputType()
export class UpdatePersonInput extends PartialType(CreateFileInput) {}
