import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostObjectType } from '../../post/type/post.object.type';
import { UserObjectType } from '../../user/type/user.object-type';

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

  @Field(type => UserObjectType)
  public user: UserObjectType;
}

@ObjectType('CommentCountObjectType')
export class CommentCountObjectType {
  @Field(type => Int)
  postId: number;

  @Field(type => Int)
  commentCount: number;

  @Field(type => PostObjectType, { nullable: true })
  post?: PostObjectType;
}
