import { PostAdapterService } from './post.adapter.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [PostAdapterService],
  exports: [PostAdapterService],
})
export class PostAdapterModule {}
