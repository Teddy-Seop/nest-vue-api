import { Module } from '@nestjs/common';
import { CommentAdapterService } from './comment.adapter.service';

@Module({
  providers: [CommentAdapterService],
  exports: [CommentAdapterService],
})
export class CommentAdapterModule {}
