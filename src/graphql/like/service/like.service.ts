import { LikeAdapterService } from '@/modules/adpater/like/like.adapter.service';
import { Injectable } from '@nestjs/common';
import { LikeInputType } from '../type/like.input-type';
import { LikeCountObjectType, LikeObjectType } from '../type/like.object-type';

@Injectable()
export class LikeService {
  constructor(private readonly likeAdapterService: LikeAdapterService) {}

  public async getLikesByPostId(postId: number): Promise<LikeObjectType[]> {
    const likes: LikeObjectType[] = await this.likeAdapterService.getLikesByPostId(
      postId,
    );

    return likes;
  }

  public async getLikeCount(postIds: number[]): Promise<LikeCountObjectType[]> {
    const likeCountList: LikeCountObjectType[] = await this.likeAdapterService.getLikeCount(
      postIds,
    );

    return likeCountList;
  }

  public async hasLike(postId: number, userId: number): Promise<boolean> {
    const like = await this.likeAdapterService.getLike(postId, userId);

    if (like) {
      return true;
    } else {
      return false;
    }
  }

  public async saveLike(like: LikeInputType): Promise<boolean> {
    const result = await this.likeAdapterService.saveLike(like);

    return result;
  }

  public async deleteLike(like: LikeInputType): Promise<boolean> {
    const result = await this.likeAdapterService.deleteLike(like);

    return result;
  }
}
