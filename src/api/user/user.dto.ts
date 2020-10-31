import { Field, ObjectType, Int } from '@nestjs/graphql';
import { PostsDto } from '@/api/posts/dto/posts.dto';

@ObjectType()
export class UserDto {
    @Field(type => Int)
    id: number;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    name: string;

    @Field(type => [PostsDto])
    posts: PostsDto[];
}