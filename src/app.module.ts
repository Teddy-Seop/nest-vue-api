import { Module } from '@nestjs/common';
import { SessionModule } from 'nestjs-session';
import { GraphQLModule } from '@nestjs/graphql';

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
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),

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
