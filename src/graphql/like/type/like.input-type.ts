import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType('LikeInputType')
export class LikeInputType {
  @IsNumber()
  @Field(type => Int)
  public postId: number;

  @IsNumber()
  @IsOptional()
  @Field(type => Int, { nullable: true })
  public userId?: number;
}
