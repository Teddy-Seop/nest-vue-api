import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostResolver } from './resolver/post.resolver';
import { PostSubResolver } from './resolver/post.sub-resolver';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comment/comment.module';
import { LikeModule } from '../like/like.module';
import { CommentLoader } from './loader/comment.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { LikeLoader } from './loader/like.loader';
import { PostAdapterModule } from '@/modules/adpater/post/post.adapter.module';
import { LikeAdapterModule } from '@/modules/adpater/like/like.adapter.module';
import { CommentAdapterModule } from '@/modules/adpater/comment/comment.adpater.module';

@Module({
  imports: [
    UserModule,
    forwardRef(() => CommentModule),
    LikeModule,
    PostAdapterModule,
    CommentAdapterModule,
    LikeAdapterModule,
  ],
  providers: [
    PostService,
    PostResolver,
    PostSubResolver,

    // Dataloaders
    CommentLoader,
    LikeLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
  exports: [PostService],
})
export class PostModule {}
