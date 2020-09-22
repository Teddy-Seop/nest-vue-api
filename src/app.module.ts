import { Module } from '@nestjs/common';
import { NestSessionOptions, SessionModule } from 'nestjs-session';

import { DatabaseModule } from './models';
import { AuthModule } from './modules/auth/auth.module';

import { UserModule } from './api/user';
import { PostsModule } from './api/posts';
import { CommentsModule } from './api/comments';
import { LikesModule } from './api/likes/likes.module';

@Module({
  imports: [
    // Global Modules
    DatabaseModule,
    SessionModule.forRoot({
      session: { secret: 'keyboard cat' },
    }),
    AuthModule,

    // Controller Modules
    UserModule,
    PostsModule,
    CommentsModule,
    LikesModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
