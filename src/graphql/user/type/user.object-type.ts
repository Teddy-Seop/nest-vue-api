import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class UserObjectType {
  @Field(type => Int)
  public id: number;

  @Field(type => String)
  public email: string;

  @Field(type => String)
  public password: string;

  @Field(type => String)
  public name: string;

  @Field(type => Date)
  public createdAt: Date;

  @Field(type => Date)
  public updatedAt: Date;
}

@ObjectType()
export class AccessTokenObjectType {
  @Field(type => String)
  public accessToken: string;

  @Field(type => Int, { nullable: true })
  public userId?: number;

  @Field(type => String, { nullable: true })
  public email?: string;

  @Field(type => String, { nullable: true })
  public name?: string;
}
