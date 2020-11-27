import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from '@/models/entities/';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likesRepository: Repository<LikeEntity>,
  ) {}

  public async getLike(postId: number): Promise<LikeEntity> {
    const like = await this.likesRepository.findOneOrFail({
      where: { id: postId },
    });
    return like;
  }

  public async likePost(data: LikeEntity) {
    await this.likesRepository.save(data);
  }

  public async unlikePost(postsId: number, userId: number) {
    await this.likesRepository
      .createQueryBuilder('likes')
      .delete()
      .where('postsId = :postsId AND userId = :userId', { postsId, userId })
      .execute();
  }
}
