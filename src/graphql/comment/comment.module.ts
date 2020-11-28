import { Module } from '@nestjs/common';
import { CommentResolver } from './resolver/comment.resolver';
import { CommentService } from './service/comment.service';
import { CommonCommentService } from '../../services/common-comment.service';

@Module({
  providers: [CommentResolver, CommentService, CommonCommentService],
  exports: [CommentService],
})
export class CommentModule {}
