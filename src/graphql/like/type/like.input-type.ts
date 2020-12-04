import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class LikeInputType {
  @Field(type => Int)
  public postId: number;

  @Field(type => Int, { nullable: true })
  public userId?: number;
}
