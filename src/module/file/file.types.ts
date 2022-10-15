import { ObjectType, Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { FileInterface } from '@shared/types';
import { IsOptional, IsString, Length } from 'class-validator';

@ObjectType('FileOptions')
export class FileOptions {
  @Field()
  maxSize: number;

  @Field(() => [String])
  allowedExtensions: string[];
}

@ObjectType('File')
export class FileType implements FileInterface {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  groupId: string;

  @Field({ nullable: true })
  applicationId: string;

  @Field()
  name: string;

  @Field()
  extension: string;

  @Field()
  data: string;

  @Field()
  size: number;

  @Field()
  mime: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateFileInput
  implements Pick<FileInterface, 'groupId' | 'applicationId'>
{
  @IsString()
  @Length(8)
  @IsOptional()
  @Field({ nullable: true })
  groupId: string;

  @IsString()
  @Length(8)
  @IsOptional()
  @Field({ nullable: true })
  applicationId: string;
}

@InputType()
export class UpdateFileInput extends PartialType(CreateFileInput) {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name: string;
}
