import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LikeCountObjectType {
  @Field(type => Int)
  public postId: number;

  @Field(type => Int)
  public likeCount: number;
}
