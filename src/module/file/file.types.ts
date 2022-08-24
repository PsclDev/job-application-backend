import { ObjectType, Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { FileInterface } from '@shared/types';
import {
  IsMimeType,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

@ObjectType('File')
export class FileType implements FileInterface {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  groupId: string;

  @Field({ nullable: true })
  applicationId: string;

  @Field()
  name: string;

  @Field()
  extension: string;

  @Field()
  data: string;

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
  implements
    Omit<
      FileInterface,
      'id' | 'extension' | 'data' | 'createdAt' | 'updatedAt'
    >
{
  @IsString()
  @Length(8)
  @IsOptional()
  @Field({ nullable: true })
  groupId: string;

  @IsString()
  @Length(8)
  @IsOptional()
  @Field({ nullable: true })
  applicationId: string;

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
