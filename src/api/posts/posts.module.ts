
import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsDto } from './dto/posts.dto';
import { PostsResolver } from './posts.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  exports: [PostsService],
  controllers: [PostsController],
  providers: [PostsService, PostsDto, PostsResolver],
})
export class PostsModule {}