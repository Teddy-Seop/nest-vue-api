import { BadRequestException } from '@nestjs/common';
import { Args, Int, Resolver, Query, Mutation } from '@nestjs/graphql';
import { LikeService } from '../service/like.service';

@Resolver()
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Query(returns => Boolean)
  public async like(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<boolean> {
    try {
      const hasLike = await this.likeService.hasLike(postId, userId);

      return hasLike;
    } catch (error) {
      new BadRequestException('Can not get like');
    }
  }

  @Query(returns => Int)
  public async likeCount(
    @Args('postId', { type: () => Int }) postId: number,
  ): Promise<number> {
    try {
      const count = await this.likeService.getLikeCountByPostId(postId);

      return count;
    } catch (error) {
      new BadRequestException('Can not get like count');
    }
  }

  @Mutation(returns => Boolean)
  public async saveLike(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<boolean> {
    try {
      const result = await this.likeService.saveLike(postId, userId);

      return result;
    } catch (error) {
      new BadRequestException('Can not save like');
    }
  }

  @Mutation(returns => Boolean)
  public async deleteLike(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<boolean> {
    try {
      const result = await this.likeService.deleteLike(postId, userId);

      return result;
    } catch (error) {
      new BadRequestException('Can not delete like');
    }
  }
}
