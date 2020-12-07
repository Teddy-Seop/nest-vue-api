import { LikeAdapterService } from './like.adapter.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [LikeAdapterService],
  exports: [LikeAdapterService],
})
export class LikeAdapterModule {}
