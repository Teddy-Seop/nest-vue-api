import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { PostObjectType } from '../type/post.object.type';
import { PostInputType } from '../type/post.input-type';
import { LocalAuthGuard } from '@/modules/auth/local-auth.guard';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(returns => PostObjectType)
  @UseGuards(LocalAuthGuard)
  async post(
    @Args('postId', { type: () => Int }) postId: number,
  ): Promise<PostObjectType> {
    try {
      return this.postService.getPost(postId);
    } catch (e) {
      throw new BadRequestException('Can not get post');
    }
  }

  @Query(returns => [PostObjectType])
  async postList(
    @Args('page', { type: () => Int }) page: number,
  ): Promise<PostObjectType[]> {
    try {
      const postList: PostObjectType[] = await this.postService.getPostList(
        page,
      );

      return postList;
    } catch (error) {
      throw new error();
    }
  }

  @Mutation(returns => Boolean)
  public async savePost(
    @Args('post', { type: () => PostInputType }) post: PostInputType,
  ): Promise<boolean> {
    try {
      const result = await this.postService.savePost(post);

      return result;
    } catch (error) {
      throw new BadRequestException('Can not save post');
    }
  }

  @Mutation(returns => Boolean)
  public async deletePost(
    @Args('postId', { type: () => Int }) postId: number,
  ): Promise<boolean> {
    try {
      const result = await this.postService.deletePost(postId);

      return result;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Can not delete post');
    }
  }
}
