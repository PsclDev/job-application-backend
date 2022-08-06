import { ApplicationType } from '@module/application/application.types';
import { ObjectType, Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { ApplicationInterface, GroupInterface } from '@shared/types';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
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

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean)
  isArchived = false;
}

@InputType()
export class UpdateGroupInput extends PartialType(CreateGroupInput) {}
