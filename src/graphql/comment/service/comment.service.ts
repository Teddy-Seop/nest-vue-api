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

  public async deleteCommentById(commentId: number): Promise<boolean> {
    const result = await this.commonCommentService.deleteCommentById(commentId);

    return result;
  }

  public async deleteCommentByPostId(postId: number): Promise<boolean> {
    const result = await this.commonCommentService.deleteCommentByPostId(
      postId,
    );

    return result;
  }
}
