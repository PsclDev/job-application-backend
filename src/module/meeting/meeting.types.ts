import { CreatePersonInput, PersonType } from '@module/person/person.types';
import { ObjectType, Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { MeetingInterface, PersonInterface } from '@shared/types';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

@ObjectType('Meeting')
export class MeetingType implements MeetingInterface {
  @Field(() => ID)
  id: string;

  @Field()
  applicationId: string;

  @Field()
  title: string;

  @Field()
  date: Date;

  @Field(() => [PersonType], { nullable: true })
  attendees: PersonInterface[];

  @Field({ nullable: true })
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
  @Length(8)
  @Field()
  applicationId: string;

  @IsString()
  @MinLength(3)
  @Field()
  title: string;

  @IsDate()
  @Field(() => Date)
  date: Date;

  @IsOptional()
  @Type(() => CreatePersonInput)
  @Field(() => CreatePersonInput, { nullable: true })
  attendees: PersonInterface[] = null;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  notes: string;
}

@InputType()
export class UpdateMeetingInput extends PartialType(CreateMeetingInput) {}
