import { Field, Int, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class PostInputType {
  @IsNumber()
  @IsOptional()
  @Field(type => Int, { nullable: true })
  public id?: number;

  @IsString()
  @Field(type => String)
  public title: string;

  @IsString()
  @Field(type => String)
  public contents: string;

  @IsNumber()
  @Field(type => Int)
  public userId: number;
}
