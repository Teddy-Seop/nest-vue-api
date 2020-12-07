import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { LikeCountObjectType } from '../type/like.object-type';
import { CommonPostService } from '@/services/common-post.service';
import { PostObjectType } from '../../post/type/post.object.type';

@Resolver(of => LikeCountObjectType)
export class LikeSubResolver {
  constructor(private readonly commonPostService: CommonPostService) {}

  @ResolveField(returns => PostObjectType)
  public async post(
    @Parent() likeCount: LikeCountObjectType,
  ): Promise<PostObjectType> {
    try {
      const post: PostObjectType = await this.commonPostService.getPostById(
        likeCount.postId,
      );

      return post;
    } catch (error) {
      throw error;
    }
  }
}
