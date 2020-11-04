import { Resolver, Query, Args, Int, ResolveField, Parent, Mutation } from "@nestjs/graphql";
import { BadRequestException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsDto, PostsInputDto } from './dto';
import { UserService } from '../user/user.service';
import { IPostList } from '@/type/post';
import { PostsEntity } from '../../models/entities/posts.entity';

@Resolver(() => PostsDto)
export class PostsResolver {
    constructor(
        private readonly postsService: PostsService,
        private readonly userService: UserService
    ) { }

    @Query(returns => [PostsDto])
    async getPostList(): Promise<IPostList[]> {
        try {
            let postList: IPostList[];
            postList = await this.postsService.getPostList();
            console.log(postList);
            return postList;
        } catch {
            throw new BadRequestException(`Can't get post list`);
        }
    }

    @Query(returns => PostsDto)
    async getPost(@Args('postId', { type: () => Int }) postId: number): Promise<PostsEntity> {
        return this.postsService.getPost(postId);
    }

    @Query(returns => [PostsDto])
    public async getMostLikes(): Promise<PostsEntity[]> {
        try {
            return await this.postsService.getMostLikes();
        } catch {
            throw new BadRequestException(`Can't get top likes post`);
        }
    }

    @Query(returns => [PostsDto])
    public async getMostComments(): Promise<PostsEntity[]>{
      try {
        return await this.postsService.getMostComments();
      } catch {
        throw new BadRequestException(`Can't get top comments post`);
      }
    }

    @Mutation(type => PostsDto)
    async upsertPost(@Args({ name: 'data', type: () => PostsInputDto }) data: PostsInputDto): Promise<number> {
        console.log(data)
        return this.postsService.addPost(data);
    }

    @Mutation(type => PostsDto)
    public async deletePost(@Args({ name: 'postId', type: () => Int }) postId: number) {
        try {
            await this.postsService.deletePost(postId);
            return "OK";
        } catch (error) {
            console.log(error);
            throw new BadRequestException(`Can't delete ${postId}`);
        }
    }
}