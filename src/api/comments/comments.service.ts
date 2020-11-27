import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '@/models/entities/';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
  ) {}

  public async getComment(commentId: number): Promise<CommentEntity> {
    const comment = await this.commentsRepository.findOneOrFail({
      where: { id: commentId },
    });
    return comment;
  }

  public async getCommentsList(postsId: number): Promise<CommentEntity[]> {
    const commentsList: CommentEntity[] = await this.commentsRepository.find({
      where: { postsId: postsId },
      relations: ['user'],
    });
    return commentsList;
  }

  public async writeComment(comment: CommentEntity) {
    await this.commentsRepository.save(comment);
  }

  public async deleteComment(id: number) {
    await this.commentsRepository
      .createQueryBuilder('comments')
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
