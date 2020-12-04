import { UseGuards } from '@nestjs/common';
import { Args, Int, Resolver, Query, Mutation } from '@nestjs/graphql';

import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { CommentService } from '../service/comment.service';

import {
  CommentObjectType,
  CommentCountObjectType,
} from '../type/comment.object-type';
import {
  SaveCommentInputType,
  DeleteCommentInputType,
} from '../type/comment.input-type';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(returns => [CommentObjectType])
  @UseGuards(JwtAuthGuard)
  public async commentList(
    @Args('postId', { type: () => Int }) postId: number,
  ): Promise<CommentObjectType[]> {
    try {
      const commentList = await this.commentService.getCommentList(postId);

      return commentList;
    } catch (error) {
      throw error;
    }
  }

  @Query(returns => [CommentCountObjectType])
  @UseGuards(JwtAuthGuard)
  public async topComment(): Promise<CommentCountObjectType[]> {
    try {
      const result: CommentCountObjectType[] = await this.commentService.getTopCommentCount();

      return result;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(returns => [CommentObjectType])
  @UseGuards(JwtAuthGuard)
  public async saveComment(
    @Args('comment', { type: () => SaveCommentInputType })
    comment: SaveCommentInputType,
  ): Promise<CommentObjectType[]> {
    try {
      const comments: CommentObjectType[] = await this.commentService.saveComment(
        comment,
      );

      return comments;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(returns => [CommentObjectType])
  @UseGuards(JwtAuthGuard)
  public async deleteComment(
    @Args('comment', { type: () => DeleteCommentInputType })
    comment: DeleteCommentInputType,
  ): Promise<CommentObjectType[]> {
    try {
      const comments: CommentObjectType[] = await this.commentService.deleteCommentById(
        comment,
      );

      return comments;
    } catch (error) {
      throw error;
    }
  }
}
