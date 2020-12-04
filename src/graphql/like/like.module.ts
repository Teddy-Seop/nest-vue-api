import { Module } from '@nestjs/common';
import { LikeService } from './service/like.service';
import { LikeResolver } from './resolver/like.resolver';
import { CommonLikeService } from '../../services/common-like.service';
import { AuthModule } from '../../modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [LikeService, LikeResolver, CommonLikeService],
  exports: [LikeService, CommonLikeService],
})
export class LikeModule {}
