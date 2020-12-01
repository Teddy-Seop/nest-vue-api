import { UserObjectType } from '@/graphql/user/type/user.object-type';
import { Field, ObjectType, Int } from '@nestjs/graphql';

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
