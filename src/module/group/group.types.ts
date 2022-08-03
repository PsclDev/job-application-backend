import { ObjectType, Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export interface GroupBaseInterface {
  id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  isArchived: boolean;
}

@ObjectType('Group')
export class GroupType implements GroupBaseInterface {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;

  @Field(() => Boolean)
  isArchived: boolean;
}

@InputType()
export class CreateGroupInput
  implements
    Omit<GroupBaseInterface, 'id' | 'applications' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @MinLength(3)
  @Field()
  name: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  description = null;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean)
  isArchived = false;
}

@InputType()
export class UpdateGroupInput extends PartialType(CreateGroupInput) {}
