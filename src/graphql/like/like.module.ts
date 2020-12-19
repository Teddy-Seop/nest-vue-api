import { Module } from '@nestjs/common';
import { LikeService } from './service/like.service';
import { LikeResolver } from './resolver/like.resolver';
import { LikeAdapterModule } from '@/modules/adpater/like/like.adapter.module';

@Module({
  imports: [LikeAdapterModule],
  providers: [LikeService, LikeResolver],
  exports: [LikeService],
})
export class LikeModule {}
