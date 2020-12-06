import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LikeObjectType {
  @Field(type => Int)
  public id: number;

  @Field(type => Int)
  public postId: number;

  @Field(type => Int)
  public userId: number;
}

@ObjectType()
export class LikeCountObjectType {
  @Field(type => Int)
  public postId: number;

  @Field(type => Int)
  public likeCount: number;
}
