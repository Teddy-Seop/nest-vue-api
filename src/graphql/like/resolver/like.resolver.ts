import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Resolver, Query, Mutation } from '@nestjs/graphql';
import { LikeService } from '../service/like.service';
import { LikeObjectType } from '../type/like.object-type';
import { LikeInputType } from '../type/like.input-type';
import { LikeCountObjectType } from '@/graphql/like/type/like.object-type';

@Resolver()
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Query(returns => Boolean)
  @UseGuards(JwtAuthGuard)
  public async like(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<boolean> {
    try {
      const hasLike = await this.likeService.hasLike(postId, userId);

      return hasLike;
    } catch (error) {
      throw error;
    }
  }

  @Query(returns => [LikeObjectType])
  @UseGuards(JwtAuthGuard)
  public async likes(
    @Args('postId', { type: () => Int }) postId: number,
  ): Promise<LikeObjectType[]> {
    try {
      const likes: LikeObjectType[] = await this.likeService.getLikesByPostId(
        postId,
      );

      return likes;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(returns => Boolean)
  @UseGuards(JwtAuthGuard)
  public async saveLike(
    @Args('like', { type: () => LikeInputType }) like: LikeInputType,
  ): Promise<boolean> {
    try {
      const result = await this.likeService.saveLike(like);

      return result;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(returns => Boolean)
  @UseGuards(JwtAuthGuard)
  public async deleteLike(
    @Args('like', { type: () => LikeInputType }) like: LikeInputType,
  ): Promise<boolean> {
    try {
      const result = await this.likeService.deleteLike(like);

      return result;
    } catch (error) {
      throw error;
    }
  }
}
