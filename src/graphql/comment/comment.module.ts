import { forwardRef, Module } from '@nestjs/common';
import { CommentResolver } from './resolver/comment.resolver';
import { CommentService } from './service/comment.service';
import { CommonCommentService } from '../../services/common-comment.service';
import { CommentSubResolver } from './resolver/comment.sub-resolver';
import { PostModule } from '../post/post.module';
import { AuthModule } from '../../modules/auth/auth.module';
@Module({
  imports: [forwardRef(() => PostModule), AuthModule],
  providers: [
    // Resolvers
    CommentResolver,
    CommentSubResolver,

    // Services
    CommentService,
    CommonCommentService,
  ],
  exports: [CommentService, CommonCommentService],
})
export class CommentModule {}
