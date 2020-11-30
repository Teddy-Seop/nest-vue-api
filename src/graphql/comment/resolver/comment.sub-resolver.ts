import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CommentCountObjectType } from '../type/comment.object-type';
import { PostService } from '../../post/service/post.service';
import { PostObjectType } from '../../post/type/post.object.type';
import { BadRequestException } from '@nestjs/common';

@Resolver(of => CommentCountObjectType)
export class CommentSubResolver {
  constructor(private readonly postService: PostService) {}
  @ResolveField(returns => PostObjectType)
  public async post(
    @Parent() commentCount: CommentCountObjectType,
  ): Promise<PostObjectType> {
    try {
      const post: PostObjectType = await this.postService.getPost(
        commentCount.postId,
      );
      return post;
    } catch (error) {
      new BadRequestException('Can not get a post');
    }
  }
}
