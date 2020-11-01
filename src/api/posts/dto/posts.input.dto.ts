import { Field, Int, InputType } from "@nestjs/graphql";
import { IsOptional } from 'class-validator';

@InputType('PostsInputDto')
export class PostsInputDto {
    @Field(type => Int, { nullable: true })
    @IsOptional()
    id?: number;

    @Field()
    title: string;

    @Field()
    contents: string;

    @Field(type => Int)
    @IsOptional()
    userId?: number;
}