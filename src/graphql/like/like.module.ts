import { Module } from '@nestjs/common';
import { LikeService } from './service/like.service';
import { LikeResolver } from './resolver/like.resolver';
import { CommonLikeService } from '../../services/common-like.service';

@Module({
  providers: [LikeService, LikeResolver, CommonLikeService],
  exports: [LikeService, CommonLikeService],
})
export class LikeModule {}
