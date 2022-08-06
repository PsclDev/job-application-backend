import { ObjectType, Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { PersonInterface } from '@shared/types';
import { IsString, MinLength } from 'class-validator';

@ObjectType('Person')
export class PersonType implements PersonInterface {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  position: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreatePersonInput
  implements Omit<PersonInterface, 'id' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  @MinLength(3)
  @Field()
  name: string;

  @IsString()
  @MinLength(3)
  @Field()
  position: string;
}

@InputType()
export class UpdatePersonInput extends PartialType(CreatePersonInput) {}
