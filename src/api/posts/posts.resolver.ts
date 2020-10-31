import { Resolver, Query, Args, Int, ResolveField, Parent, Mutation } from "@nestjs/graphql";
import { PostsService } from './posts.service';
import { PostsDto, PostsInputDto } from './dto';
import { UserService } from '../user/user.service';

@Resolver(() => PostsDto)
export class PostsResolver {
    constructor(
        private readonly postsService: PostsService,
        private readonly userService: UserService
    ) { }

    @Query(returns => PostsDto)
    async getPost(@Args('postId', { type: () => Int }) postId: number) {
        return this.postsService.getPost(postId);
    }

    @ResolveField()
    async user(@Parent() post: PostsDto) {
        const { id } = post;
        return this.userService.getUser(id);
    }

    @Mutation(type => PostsInputDto)
    async upsertPost(@Args({ name: 'id', type: () => PostsInputDto }) data: PostsInputDto) {
        console.log('test')
        console.log(data);
        await this.postsService.addPost(data);
    }
}