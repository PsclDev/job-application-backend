import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { StateEnum, StatusInterface } from '@shared/types';
import { IsEnum, IsDate } from 'class-validator';

@ObjectType('Status')
export class StatusType implements StatusInterface {
  @Field()
  state: StateEnum;

  @Field({ nullable: true })
  date: Date;
}

@InputType()
export class CreateStatusInput implements StatusInterface {
  @IsEnum(StateEnum)
  @Field()
  state: StateEnum;

  @IsDate()
  @Field()
  date: Date;
}
