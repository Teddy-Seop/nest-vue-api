import { LikeCountObjectType } from '@/graphql/like/type/like.object-type';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'nestjs-dataloader';
import { LikeService } from '@/graphql/like/service/like.service';

@Injectable()
export class LikeLoader implements NestDataLoader<number, LikeCountObjectType> {
  constructor(private readonly likeService: LikeService) {}

  generateDataLoader(): DataLoader<number, LikeCountObjectType> {
    return new DataLoader<number, LikeCountObjectType>(async keys => {
      const likeCountList: LikeCountObjectType[] = await this.likeService.getLikeCount(
        <number[]>keys,
      );

      const result = keys.map(key => {
        const likeCount = likeCountList.filter(
          commentCount => commentCount.postId === key,
        );

        if (!likeCount[0]) {
          likeCount[0] = {
            postId: key,
            likeCount: 0,
          };
        }

        return likeCount[0];
      });

      return result;
    });
  }
}
