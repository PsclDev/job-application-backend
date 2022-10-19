import { CreatePersonInput, PersonType } from '@module/person/person.types';
import { ObjectType, Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { MeetingInterface, PersonInterface } from '@shared/types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
  ValidateNested,
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

  @Field(() => [PersonType])
  attendees: PersonInterface[];

  @Field({ nullable: true })
  notes: string;

  @Field()
  link: string;

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
  @MaxLength(50)
  @Field()
  title: string;

  @IsDate()
  @Field(() => Date)
  date: Date;

  @Type(() => CreatePersonInput)
  @IsArray()
  @ValidateNested()
  @Field(() => [CreatePersonInput])
  attendees: PersonInterface[];

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  notes: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  link: string;
}

@InputType()
export class UpdateMeetingInput extends PartialType(CreateMeetingInput) {}
