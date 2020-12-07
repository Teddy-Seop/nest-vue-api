import { CommentEntity } from '@/models/entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IDeleteCommentInput,
  ISaveCommentInput,
} from '@/modules/adpater/comment/comment.type';
import { ICommentCount } from '@/modules/adpater/comment/comment.type';

@Injectable()
export class CommentAdapterService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  public async getComment(commentId: number): Promise<CommentEntity> {
    const user: CommentEntity = await this.commentRepository.findOneOrFail({
      id: commentId,
      deletedAt: null,
    });

    return user;
  }

  public async getCommentListByPostId(
    postId: number,
  ): Promise<CommentEntity[]> {
    const comments: CommentEntity[] = await this.commentRepository.find({
      where: {
        postId,
        deletedAt: null,
      },
      relations: ['user'],
    });

    return comments;
  }

  public async getCommentCount(postIds?: number[]): Promise<ICommentCount[]> {
    const queryBuilder = this.commentRepository.createQueryBuilder('comment');

    if (postIds) {
      queryBuilder.where('comment.postId IN (:ids)', { ids: postIds });
    }

    const result: ICommentCount[] = await queryBuilder
      .select('comment.postId AS postId')
      .addSelect('CAST(COUNT(*) AS unsigned) AS commentCount')
      .groupBy('comment.postId')
      .getRawMany();

    return result;
  }

  public async saveComment(comment: ISaveCommentInput): Promise<boolean> {
    await this.commentRepository.save(comment);

    return true;
  }

  public async deleteCommentById(
    comment: IDeleteCommentInput,
  ): Promise<boolean> {
    await this.commentRepository.softDelete(comment.id);

    return true;
  }

  public async deleteCommentByPostId(postId: number): Promise<boolean> {
    await this.commentRepository.softDelete({
      postId,
    });

    return true;
  }
}
