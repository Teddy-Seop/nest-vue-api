import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './service/post.service';
import { CommonPostService } from '../../services/common-post.service';
import { PostResolver } from './resolver/post.resolver';
import { PostSubResolver } from './resolver/post.sub-resolver';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comment/comment.module';
import { LikeModule } from '../like/like.module';
import { AuthModule } from '../../modules/auth/auth.module';

@Module({
  imports: [
    UserModule,
    forwardRef(() => CommentModule),
    LikeModule,
    AuthModule,
  ],
  providers: [PostService, CommonPostService, PostResolver, PostSubResolver],
  exports: [PostService],
})
export class PostModule {}
