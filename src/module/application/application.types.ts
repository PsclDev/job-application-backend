import { CreateFileInput, FileType } from '@module/file/file.types';
import { CreateMeetingInput, MeetingType } from '@module/meeting/meeting.types';
import { CreatePersonInput, PersonType } from '@module/person/person.types';
import { ObjectType, Field, InputType, PartialType, ID } from '@nestjs/graphql';
import {
  ApplicationInterface,
  FileInterface,
  MeetingInterface,
  PersonInterface,
} from '@shared/types';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';
@ObjectType('Application')
export class ApplicationType implements ApplicationInterface {
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

  @Field(() => PersonType, { nullable: true })
  contact: PersonInterface;

  @Field()
  jobUrl: string;

  @Field()
  status: string;

  @Field(() => [MeetingType], { nullable: true })
  meetings: MeetingInterface[];

  @Field({ nullable: true })
  notes: string;

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
export class CreateApplicationInput
  implements Omit<ApplicationInterface, 'id' | 'createdAt' | 'updatedAt'>
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

  @IsObject()
  @IsOptional()
  @Type(() => CreatePersonInput)
  @Field(() => CreatePersonInput, { nullable: true })
  contact = null;

  @IsUrl()
  @Field()
  jobUrl: string;

  @IsString()
  @MinLength(3)
  @Field()
  status: string;

  @ValidateNested()
  @Type(() => CreateMeetingInput)
  @Field(() => [CreateMeetingInput], { nullable: true })
  meetings: MeetingInterface[];

  @IsString()
  @IsOptional()
  @Field(() => String)
  notes = null;

  @ValidateNested()
  @Type(() => CreateFileInput)
  @Field(() => [CreateFileInput], { nullable: true })
  files: FileInterface[];

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean)
  isArchived = false;
}

@InputType()
export class UpdateApplicationInput extends PartialType(
  CreateApplicationInput,
) {}
