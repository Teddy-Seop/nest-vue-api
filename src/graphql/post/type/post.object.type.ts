import { Field, ObjectType, Int } from '@nestjs/graphql';
import { UserObjectType } from '../../user/type/user.object-type';
import { CommentCountObjectType } from '../../comment/type/comment.object-type';
import { LikeCountObjectType } from '../../like/type/like.object-type';

@ObjectType()
export class PostObjectType {
  @Field(type => Int)
  public id: number;

  @Field(type => String)
  public title: string;

  @Field(type => String)
  public contents: string;

  @Field(type => Int)
  public userId: number;

  @Field(type => Date)
  public createdAt: Date;
}

@ObjectType()
export class PostListObjectType {
  @Field(type => Int)
  public id: number;

  @Field(type => String)
  public title: string;

  @Field(type => String)
  public contents: string;

  @Field(type => Date)
  public createdAt: Date;

  @Field(type => UserObjectType)
  public writer: UserObjectType;

  @Field(type => CommentCountObjectType)
  public commentCount: CommentCountObjectType;

  @Field(type => LikeCountObjectType)
  public likeCount: LikeCountObjectType;

  @Field(type => Int)
  public totalPostCount: number;
}
