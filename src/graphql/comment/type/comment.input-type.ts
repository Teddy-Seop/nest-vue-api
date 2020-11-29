import { Field, Int, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CommentInputType {
  @IsNumber()
  @IsOptional()
  @Field(type => Int, { nullable: true })
  public id?: number;

  @IsString()
  @Field(type => String)
  public comment: string;

  @IsNumber()
  @Field(type => Int)
  public postId: number;

  @IsNumber()
  @Field(type => Int)
  public userId: number;
}
