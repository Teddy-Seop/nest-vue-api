import { Module } from '@nestjs/common';
import { LikeService } from './service/like.service';
import { LikeResolver } from './resolver/like.resolver';
import { CommonLikeService } from '../../services/common-like.service';
import { AuthModule } from '../../modules/auth/auth.module';
import { LikeSubResolver } from './resolver/like.sub-resolver';
import { CommonPostService } from '@/services/common-post.service';

@Module({
  imports: [AuthModule, CommonPostService],
  providers: [
    LikeService,
    LikeResolver,
    LikeSubResolver,
    CommonLikeService,
    CommonPostService,
  ],
  exports: [LikeService, CommonLikeService],
})
export class LikeModule {}
