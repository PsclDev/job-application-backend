import { PersonType } from '@module/person/person.types';
import { ObjectType, Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { MeetingInterface, PersonInterface } from '@shared/types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

@ObjectType('Meeting')
export class MeetingType implements MeetingInterface {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  date: Date;

  @Field(() => [PersonType])
  attendees: PersonInterface[];

  @Field()
  notes: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateMeetingInput
  implements Omit<MeetingInterface, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @MinLength(3)
  @Field()
  title: string;

  @IsDate()
  @Field()
  date: Date;

  @ValidateNested()
  @Type(() => PersonType)
  @Field(() => [PersonType])
  attendees: PersonInterface[];

  @IsString()
  @IsOptional()
  @Field()
  notes: string;
}

@InputType()
export class UpdateMeetingInput extends PartialType(CreateMeetingInput) {}
