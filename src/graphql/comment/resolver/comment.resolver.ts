import { BadRequestException } from '@nestjs/common';
import { Args, Int, Resolver, Query, Mutation } from '@nestjs/graphql';
import { CommentService } from '../service/comment.service';
import {
  CommentObjectType,
  CommentCountObjectType,
} from '../type/comment.object-type';
import { CommentInputType } from '../type/comment.input-type';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(returns => [CommentObjectType])
  public async commentList(
    @Args('postId', { type: () => Int }) postId: number,
  ): Promise<CommentObjectType[]> {
    try {
      const commentList = await this.commentService.getCommentList(postId);

      return commentList;
    } catch (error) {
      new BadRequestException('Can not get comment list');
    }
  }

  @Query(returns => [CommentCountObjectType])
  public async topComment(): Promise<CommentCountObjectType[]> {
    try {
      const result: CommentCountObjectType[] = await this.commentService.getCommentCount();

      return result;
    } catch (error) {
      new BadRequestException('Can not get comment list');
    }
  }

  @Mutation(returns => Boolean)
  public async saveComment(
    @Args('comment', { type: () => CommentInputType })
    comment: CommentInputType,
  ): Promise<boolean> {
    try {
      const result = this.commentService.saveComment(comment);

      return result;
    } catch (error) {
      new BadRequestException('Can not save comment');
    }
  }

  @Mutation(returns => Boolean)
  public async deleteComment(
    @Args('commentId', { type: () => Int }) commentId: number,
  ): Promise<boolean> {
    try {
      const result = await this.commentService.deleteComment(commentId);

      return result;
    } catch (error) {
      new BadRequestException('Can not delete comment');
    }
  }
}
