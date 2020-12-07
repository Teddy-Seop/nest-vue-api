import { Module } from '@nestjs/common';
import { LikeService } from './service/like.service';
import { LikeResolver } from './resolver/like.resolver';
import { AuthModule } from '@/modules/auth/auth.module';
import { LikeAdapterModule } from '@/modules/adpater/like/like.adapter.module';

@Module({
  imports: [AuthModule, LikeAdapterModule],
  providers: [LikeService, LikeResolver],
  exports: [LikeService],
})
export class LikeModule {}
