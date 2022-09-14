import { ObjectType, Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { PersonInterface } from '@shared/types';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@ObjectType('Person')
export class PersonType implements PersonInterface {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  position: string;

  @Field()
  email: string;

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
  @MaxLength(50)
  @Field()
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  @Field()
  position: string;

  @IsEmail()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  @Field()
  email: string;
}

@InputType()
export class UpdatePersonInput extends PartialType(CreatePersonInput) {}
