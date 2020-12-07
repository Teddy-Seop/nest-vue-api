import { Injectable } from '@nestjs/common';
import { CommentAdapterService } from '@/modules/adpater/comment/comment.adapter.service';
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
  constructor(private readonly commentAdapterService: CommentAdapterService) {}

  public async getCommentList(postId: number): Promise<CommentObjectType[]> {
    const commentList: CommentObjectType[] = await this.commentAdapterService.getCommentListByPostId(
      postId,
    );

    return commentList;
  }

  public async getCommentCount(
    postIds: number[],
  ): Promise<CommentCountObjectType[]> {
    const result: CommentCountObjectType[] = await this.commentAdapterService.getCommentCount(
      postIds,
    );

    return result;
  }

  public async saveComment(
    comment: SaveCommentInputType,
  ): Promise<CommentObjectType[]> {
    await this.commentAdapterService.saveComment(comment);

    const comments: CommentObjectType[] = await this.commentAdapterService.getCommentListByPostId(
      comment.postId,
    );

    return comments;
  }

  public async deleteCommentById(
    comment: DeleteCommentInputType,
  ): Promise<CommentObjectType[]> {
    await this.commentAdapterService.deleteCommentById(comment);

    const comments: CommentObjectType[] = await this.commentAdapterService.getCommentListByPostId(
      comment.postId,
    );

    return comments;
  }

  public async deleteCommentByPostId(postId: number): Promise<boolean> {
    const result = await this.commentAdapterService.deleteCommentByPostId(
      postId,
    );

    return result;
  }
}
