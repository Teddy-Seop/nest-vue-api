import { ObjectType, Field, Int, ArgsType, InputType } from "@nestjs/graphql";
import { UserDto } from '../../user/user.dto';
import { IsOptional } from 'class-validator';

@InputType('PostsInputDto')
export class PostsInputDto {
    @Field(type => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    contents: string;
}