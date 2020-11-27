import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { PostObjectType } from '../type/post.object.type';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(returns => PostObjectType)
  async getPost(
    @Args('postId', { type: () => Int }) postId: number,
  ): Promise<PostObjectType> {
    try {
      return this.postService.getPost(postId);
    } catch (e) {
      throw new BadRequestException('Can not get post');
    }
  }

  @Query(returns => [PostObjectType])
  async getPostList(
    @Args('page', { type: () => Int }) page: number,
  ): Promise<PostObjectType[]> {
    try {
      const postList: PostObjectType[] = await this.postService.getPostList(
        page,
      );

      return postList;
    } catch {
      throw new BadRequestException('Can not get post list');
    }
  }

  //   @Query(returns => [PostsDto])
  //   public async getMostLikes(): Promise<PostEntity[]> {
  //     try {
  //       return await this.postsService.getMostLikes();
  //     } catch {
  //       throw new BadRequestException('Can not get top likes post');
  //     }
  //   }

  //   @Query(returns => [PostsDto])
  //   public async getMostComments(): Promise<PostEntity[]> {
  //     try {
  //       return await this.postsService.getMostComments();
  //     } catch {
  //       throw new BadRequestException('Can not get top comments post');
  //     }
  //   }

  //   @Mutation(type => PostsDto)
  //   async upsertPost(
  //     @Args({ name: 'data', type: () => PostsInputDto }) data: PostsInputDto,
  //   ): Promise<number> {
  //     console.log(data);
  //     return this.postsService.addPost(data);
  //   }

  //   @Mutation(type => PostsDto)
  //   public async deletePost(
  //     @Args({ name: 'postId', type: () => Int }) postId: number,
  //   ) {
  //     try {
  //       await this.postsService.deletePost(postId);
  //       return 'OK';
  //     } catch (error) {
  //       console.log(error);
  //       throw new BadRequestException(`Can't delete ${postId}`);
  //     }
  //   }
}
