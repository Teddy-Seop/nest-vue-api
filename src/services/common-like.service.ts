import { LikeEntity } from '@/models/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommonLikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
  ) {}

  public async getLike(postId: number, userId: number): Promise<LikeEntity> {
    const like: LikeEntity = await this.likeRepository.findOne({
      where: {
        postId,
        userId,
        deletedAt: null,
      },
    });

    return like;
  }

  public async getLikeCountByPostId(postId: number): Promise<number> {
    const count: number = await this.likeRepository.count({
      where: {
        postId,
        deletedAt: null,
      },
    });

    return count;
  }

  public async saveLike(postId: number, userId: number): Promise<boolean> {
    await this.likeRepository.save({
      postId,
      userId,
    });

    return true;
  }

  public async deleteLike(postId: number, userId: number): Promise<boolean> {
    await this.likeRepository.softDelete({
      postId,
      userId,
    });

    return true;
  }
}
