import { ApplicationType } from '@module/application/application.types';
import { CreateFileInput, FileType } from '@module/file/file.types';
import { ObjectType, Field, InputType, PartialType, ID } from '@nestjs/graphql';
import {
  ApplicationInterface,
  FileInterface,
  GroupInterface,
} from '@shared/types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

@ObjectType('Group')
export class GroupType implements GroupInterface {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => [ApplicationType], { nullable: true })
  applications: ApplicationInterface[];

  @Field(() => [FileType], { nullable: true })
  files: FileInterface[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Boolean)
  isArchived: boolean;
}

@InputType()
export class CreateGroupInput
  implements
    Omit<GroupInterface, 'id' | 'applications' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Field()
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(155)
  @Field(() => String)
  description = null;

  @IsOptional()
  @Type(() => CreateFileInput)
  @IsArray()
  @ValidateNested()
  @Field(() => [CreateFileInput], { nullable: true })
  files: FileInterface[];

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean)
  isArchived = false;
}

@InputType()
export class UpdateGroupInput extends PartialType(CreateGroupInput) {}
