import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { CommonPostService } from '../../services/common-post.service';
import { PostResolver } from './resolver/post.resolver';
import { PostSubResolver } from './resolver/post.sub-resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [PostService, CommonPostService, PostResolver, PostSubResolver],
  exports: [PostService],
})
export class PostModule {}
