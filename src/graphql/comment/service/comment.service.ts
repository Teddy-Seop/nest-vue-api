import { Injectable } from '@nestjs/common';
import { CommonCommentService } from '../../../services/common-comment.service';
import {
  CommentObjectType,
  CommentCountObjectType,
} from '../type/comment.object-type';
import { CommentInputType } from '../type/comment.input-type';

@Injectable()
export class CommentService {
  constructor(private readonly commonCommentService: CommonCommentService) {}

  public async getCommentList(postId: number): Promise<CommentObjectType[]> {
    const commentList: CommentObjectType[] = await this.commonCommentService.getCommentListByPostId(
      postId,
    );

    return commentList;
  }

  public async getCommentCount(): Promise<CommentCountObjectType[]> {
    const result: CommentCountObjectType[] = await this.commonCommentService.getCommentCount();

    return result;
  }

  public async saveComment(comment: CommentInputType): Promise<boolean> {
    const result = await this.commonCommentService.saveComment(comment);

    return result;
  }

  public async deleteComment(commentId: number): Promise<boolean> {
    const result = await this.commonCommentService.deleteComment(commentId);

    return result;
  }
}
