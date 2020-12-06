import { Injectable } from '@nestjs/common';
import { CommonCommentService } from '../../../services/common-comment.service';
import {
  SaveCommentInputType,
  DeleteCommentInputType,
} from '../type/comment.input-type';
import {
  CommentObjectType,
  CommentCountObjectType,
} from '../type/comment.object-type';

@Injectable()
export class CommentService {
  constructor(private readonly commonCommentService: CommonCommentService) {}

  public async getCommentList(postId: number): Promise<CommentObjectType[]> {
    const commentList: CommentObjectType[] = await this.commonCommentService.getCommentListByPostId(
      postId,
    );

    return commentList;
  }

  public async getCommentCount(
    postIds: number[],
  ): Promise<CommentCountObjectType[]> {
    const result: CommentCountObjectType[] = await this.commonCommentService.getCommentCount(
      postIds,
    );

    return result;
  }

  public async getTopCommentCount(): Promise<CommentCountObjectType[]> {
    const commentCountList: CommentCountObjectType[] = await this.commonCommentService.getCommentCount();

    const result: CommentCountObjectType[] = commentCountList
      .sort((target1, target2) => {
        return target1.commentCount > target2.commentCount
          ? -1
          : target1.commentCount < target2.commentCount
          ? 1
          : 0;
      })
      .slice(0, 5);

    return result;
  }

  public async saveComment(
    comment: SaveCommentInputType,
  ): Promise<CommentObjectType[]> {
    await this.commonCommentService.saveComment(comment);

    const comments: CommentObjectType[] = await this.commonCommentService.getCommentListByPostId(
      comment.postId,
    );

    return comments;
  }

  public async deleteCommentById(
    comment: DeleteCommentInputType,
  ): Promise<CommentObjectType[]> {
    await this.commonCommentService.deleteCommentById(comment);

    const comments: CommentObjectType[] = await this.commonCommentService.getCommentListByPostId(
      comment.postId,
    );

    return comments;
  }

  public async deleteCommentByPostId(postId: number): Promise<boolean> {
    const result = await this.commonCommentService.deleteCommentByPostId(
      postId,
    );

    return result;
  }
}
