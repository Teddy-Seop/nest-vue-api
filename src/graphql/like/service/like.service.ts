import { Injectable } from '@nestjs/common';
import { CommonLikeService } from '@/services/common-like.service';
import { LikeInputType } from '../type/like.input-type';
import { LikeCountObjectType, LikeObjectType } from '../type/like.object-type';

@Injectable()
export class LikeService {
  constructor(private readonly commonLikeService: CommonLikeService) {}

  public async getLikesByPostId(postId: number): Promise<LikeObjectType[]> {
    const likes: LikeObjectType[] = await this.commonLikeService.getLikesByPostId(
      postId,
    );

    return likes;
  }

  public async getLikeCount(postIds: number[]): Promise<LikeCountObjectType[]> {
    const likeCountList: LikeCountObjectType[] = await this.commonLikeService.getLikeCount(
      postIds,
    );

    return likeCountList;
  }

  public async hasLike(postId: number, userId: number): Promise<boolean> {
    const like = await this.commonLikeService.getLike(postId, userId);

    if (like) {
      return true;
    } else {
      return false;
    }
  }

  public async saveLike(like: LikeInputType): Promise<boolean> {
    const result = await this.commonLikeService.saveLike(like);

    return result;
  }

  public async deleteLike(like: LikeInputType): Promise<boolean> {
    const result = await this.commonLikeService.deleteLike(like);

    return result;
  }
}
