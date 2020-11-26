import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class PostObjectType {
  @Field(type => Int)
  public id: number;

  @Field(type => String)
  public title: string;

  @Field(type => String)
  public contents: string;
}
