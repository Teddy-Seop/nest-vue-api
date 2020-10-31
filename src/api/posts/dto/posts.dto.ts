import { ObjectType, Field, Int, ArgsType, InputType } from "@nestjs/graphql";
import { UserDto } from '../../user/user.dto';
import { IsOptional } from 'class-validator';

@ObjectType()
export class PostsDto {
    @Field(type => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    contents: string;

    @Field(type => UserDto)
    @IsOptional()
    user?: UserDto;
}