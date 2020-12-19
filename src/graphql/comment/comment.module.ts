import { forwardRef, Module } from '@nestjs/common';
import { CommentResolver } from './resolver/comment.resolver';
import { CommentService } from './service/comment.service';
import { PostModule } from '../post/post.module';
import { CommentAdapterModule } from '../../modules/adpater/comment/comment.adpater.module';
@Module({
  imports: [forwardRef(() => PostModule), CommentAdapterModule],
  providers: [
    // Resolvers
    CommentResolver,

    // Services
    CommentService,
  ],
  exports: [CommentService],
})
export class CommentModule {}
