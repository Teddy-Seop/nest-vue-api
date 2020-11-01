import { ObjectType, Field, Int, ArgsType, InputType } from "@nestjs/graphql";
import { UserDto } from '../../user/user.dto';
import { IsOptional } from 'class-validator';
import { CommentsDto } from '../../comments/dto/comments.dto';
import { LikesDto } from '../../likes/dto/likes.dto';

@ObjectType()
export class PostsDto {
    @Field(type => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    contents: string;

    @Field(type => Int)
    userId: number;

    @Field(type => UserDto)
    @IsOptional()
    user?: UserDto;

    @Field(type => CommentsDto)
    @IsOptional()
    comments?: CommentsDto;

    @Field(type => LikesDto)
    @IsOptional()
    likes?: LikesDto;
}