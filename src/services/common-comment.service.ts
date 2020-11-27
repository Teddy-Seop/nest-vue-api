import { CommentEntity } from '@/models/entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CommonCommentService {
  constructor(private readonly userRepository: Repository<CommentEntity>) {}

  public async getUser(commentId: number): Promise<CommentEntity> {
    const user: CommentEntity = await this.userRepository.findOneOrFail(
      commentId,
    );

    return user;
  }
}
