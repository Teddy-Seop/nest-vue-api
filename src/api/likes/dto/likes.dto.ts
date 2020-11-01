import { ObjectType, Field, Int, ArgsType, InputType } from "@nestjs/graphql";
import { UserDto } from '@/api/user/user.dto';
import { PostsDto } from '@/api/posts/dto';
import { IsOptional } from 'class-validator';

@ObjectType()
export class LikesDto {
    @Field(type => Int)
    id: number;

    @Field(type => Int)
    postsId: number;

    @Field(type => Int)
    userId: number;

    @Field(type => UserDto)
    @IsOptional()
    user?: UserDto;

    @Field(type => PostsDto)
    @IsOptional()
    posts?: PostsDto;
}