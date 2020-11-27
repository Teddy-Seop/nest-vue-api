import { Field, Int, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UserInputType {
  @IsOptional()
  @Field(type => Int, { nullable: true })
  public id?: number;

  @IsString()
  @Field(type => String)
  public email: string;

  @IsString()
  @Field(type => String)
  public password: string;

  @IsString()
  @Field(type => String)
  public name: string;
}
