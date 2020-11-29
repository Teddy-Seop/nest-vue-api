import { Injectable } from '@nestjs/common';
import { CommonLikeService } from '@/services/common-like.service';

@Injectable()
export class LikeService {
  constructor(private readonly commonLikeService: CommonLikeService) {}

  public async getLikeCountByPostId(postId: number): Promise<number> {
    const count = await this.commonLikeService.getLikeCountByPostId(postId);

    return count;
  }

  public async hasLike(postId: number, userId: number): Promise<boolean> {
    const like = await this.commonLikeService.getLike(postId, userId);

    if (like) {
      return true;
    } else {
      return false;
    }
  }

  public async saveLike(postId: number, userId: number): Promise<boolean> {
    const result = await this.commonLikeService.saveLike(postId, userId);

    return result;
  }

  public async deleteLike(postId: number, userId: number): Promise<boolean> {
    const result = await this.commonLikeService.deleteLike(postId, userId);

    return result;
  }
}
