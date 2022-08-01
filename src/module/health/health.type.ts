import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Health')
export class HealthType {
  @Field()
  version: string;

  @Field()
  databaseRunning: boolean;
}
