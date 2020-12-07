import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { PostObjectType } from '../type/post.object.type';
import { PostInputType } from '../type/post.input-type';
import { JwtAuthGuard } from '../../../modules/auth/jwt-auth.guard';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(returns => PostObjectType)
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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

  @Query(returns => Int)
  @UseGuards(JwtAuthGuard)
  async totalPostCount(): Promise<number> {
    try {
      const totalCount: number = await this.postService.getPostCount();

      return totalCount;
    } catch (error) {
      throw new error();
    }
  }

  @Query(retruns => [PostObjectType])
  @UseGuards(JwtAuthGuard)
  async topLikePostList(): Promise<PostObjectType[]> {
    try {
      const topLikePostList: PostObjectType[] = await this.postService.getTopLikePostList();

      return topLikePostList;
    } catch (error) {
      throw error;
    }
  }

  @Query(retruns => [PostObjectType])
  @UseGuards(JwtAuthGuard)
  async topCommentPostList(): Promise<PostObjectType[]> {
    try {
      const topLikePostList: PostObjectType[] = await this.postService.getTopCommentPostList();

      return topLikePostList;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(returns => Boolean)
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
