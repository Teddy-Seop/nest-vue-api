import { forwardRef, Module } from '@nestjs/common';
import { CommentResolver } from './resolver/comment.resolver';
import { CommentService } from './service/comment.service';
import { CommonCommentService } from '../../services/common-comment.service';
import { CommentSubResolver } from './resolver/comment.sub-resolver';
import { PostModule } from '../post/post.module';
@Module({
  imports: [forwardRef(() => PostModule)],
  providers: [
    // Resolvers
    CommentResolver,
    CommentSubResolver,

    // Services
    CommentService,
    CommonCommentService,
  ],
  exports: [CommentService],
})
export class CommentModule {}
