import { ObjectType, Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { FileInterface } from '@shared/types';
import { IsMimeType, IsNumber, IsString, MinLength } from 'class-validator';

@ObjectType('File')
export class FileType implements FileInterface {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Number)
  size: number;

  @Field()
  mime: string;

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
  name: string;

  @IsNumber()
  @Field(() => Number)
  size: number;

  @IsMimeType()
  @MinLength(3)
  @Field()
  mime: string;
}

@InputType()
export class UpdatePersonInput extends PartialType(CreateFileInput) {}
