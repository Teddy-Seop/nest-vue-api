import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsDto, ListDto, PostsInputDto } from './dto';
import { PostEntity } from '../../models/entities/post.entity';

@Resolver(() => PostsDto)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(returns => ListDto)
  async getPostList(
    @Args('page', { type: () => Int }) page: number,
  ): Promise<ListDto> {
    try {
      const postList: ListDto = await this.postsService.getPostList(page);
      return postList;
    } catch {
      throw new BadRequestException('Can not get post list');
    }
  }

  @Query(returns => PostsDto)
  async getPost(
    @Args('postId', { type: () => Int }) postId: number,
  ): Promise<PostEntity> {
    try {
      return this.postsService.getPost(postId);
    } catch (e) {
      throw new BadRequestException('Can not get post');
    }
  }

  @Query(returns => [PostsDto])
  public async getMostLikes(): Promise<PostEntity[]> {
    try {
      return await this.postsService.getMostLikes();
    } catch {
      throw new BadRequestException('Can not get top likes post');
    }
  }

  @Query(returns => [PostsDto])
  public async getMostComments(): Promise<PostEntity[]> {
    try {
      return await this.postsService.getMostComments();
    } catch {
      throw new BadRequestException('Can not get top comments post');
    }
  }

  @Mutation(type => PostsDto)
  async upsertPost(
    @Args({ name: 'data', type: () => PostsInputDto }) data: PostsInputDto,
  ): Promise<number> {
    console.log(data);
    return this.postsService.addPost(data);
  }

  @Mutation(type => PostsDto)
  public async deletePost(
    @Args({ name: 'postId', type: () => Int }) postId: number,
  ) {
    try {
      await this.postsService.deletePost(postId);
      return 'OK';
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`Can't delete ${postId}`);
    }
  }
}
