import { PersonType } from '@module/person/person.types';
import { ObjectType, Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { MeetingInterface, PersonInterface } from '@shared/types';
import { IsDate, IsOptional, IsString, MinLength } from 'class-validator';

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
  implements
    Omit<MeetingInterface, 'id' | 'attendees' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @MinLength(3)
  @Field()
  title: string;

  @IsDate()
  @Field()
  date: Date;

  @IsString()
  @IsOptional()
  @Field()
  notes: string;
}

@InputType()
export class UpdateMeetingInput extends PartialType(CreateMeetingInput) {}
