import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('CommentObjectType')
export class CommentObjectType {
  @Field(type => Int)
  public id: number;

  @Field(type => String)
  public comment: string;

  @Field(type => Date)
  public createdAt: Date;

  @Field(type => Date)
  public updatedAt: Date;
}

@ObjectType('CommentCountObjectType')
export class CommentCountObjectType {
  @Field(type => Int)
  postId: number;

  @Field(type => Int)
  commentCount: number;
}
