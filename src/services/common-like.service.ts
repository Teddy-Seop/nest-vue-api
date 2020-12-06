import { LikeEntity } from '@/models/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILikeInput } from '@/type/like.type';
import { ILikeCount } from '@/type/like.type';

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

  public async getLikesByPostId(postId: number): Promise<LikeEntity[]> {
    const likes: LikeEntity[] = await this.likeRepository.find({
      where: {
        postId,
        deletedAt: null,
      },
    });

    return likes;
  }

  public async getLikeCount(postIds: number[]): Promise<ILikeCount[]> {
    const likeCountList: ILikeCount[] = await this.likeRepository
      .createQueryBuilder('like')
      .select('postId')
      .addSelect('CAST(COUNT(*) AS unsigned) AS likeCount')
      .where('like.postId IN (:ids)', { ids: postIds })
      .groupBy('like.postId')
      .getRawMany();

    return likeCountList;
  }

  public async saveLike(like: ILikeInput): Promise<boolean> {
    await this.likeRepository.save(like);

    return true;
  }

  public async deleteLike(deleteOption: ILikeInput): Promise<boolean> {
    await this.likeRepository.softDelete(deleteOption);

    return true;
  }
}
