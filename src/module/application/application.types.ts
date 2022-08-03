import { ObjectType, Field, InputType, PartialType, ID } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';

export interface ApplicationBaseInterface {
  id: string;
  groupId: string;
  name: string;
  description: string;
  company: string;
  contact: string;
  jobUrl: string;
  status: string;
  notes: string;
  files: string[];
  createdAt?: Date;
  updatedAt?: Date;
  isArchived: boolean;
}

@ObjectType('Application')
export class ApplicationType implements ApplicationBaseInterface {
  @Field(() => ID)
  id: string;

  @Field()
  groupId: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  company: string;

  @Field({ nullable: true })
  contact: string;

  @Field()
  jobUrl: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  notes: string;

  @Field(() => [String], { nullable: true })
  files: string[];

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;

  @Field(() => Boolean)
  isArchived: boolean;
}

@InputType()
export class CreateApplicationInput
  implements Omit<ApplicationBaseInterface, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @Length(8)
  @Field()
  groupId: string;

  @IsString()
  @MinLength(3)
  @Field()
  name: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  description = null;

  @IsString()
  @MinLength(3)
  @Field()
  company: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  contact = null;

  @IsUrl()
  @Field()
  jobUrl: string;

  @IsString()
  @MinLength(3)
  @Field()
  status: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  notes = null;

  @IsArray()
  @IsString({ each: true })
  files: string[] = [];

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean)
  isArchived = false;
}

@InputType()
export class UpdateApplicationInput extends PartialType(
  CreateApplicationInput,
) {}
