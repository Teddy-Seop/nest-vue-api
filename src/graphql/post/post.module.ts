import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { CommonPostService } from '../../services/common-post.service';
import { PostResolver } from './resolver/post.resolver';

@Module({
  providers: [PostService, CommonPostService, PostResolver],
})
export class PostModule {}
