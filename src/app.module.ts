import { Module } from '@nestjs/common';
import { SessionModule } from 'nestjs-session';
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from './models';

import { PostModule } from './graphql/post/post.module';
import { UserModule } from './graphql/user/user.module';
import { CommentModule } from './graphql/comment/comment.module';
import { LikeModule } from './graphql/like/like.module';

@Module({
  imports: [
    // Global Modules
    DatabaseModule,
    SessionModule.forRoot({
      session: { secret: 'keyboard cat' },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),

    // GraphQL Modules
    PostModule,
    UserModule,
    CommentModule,
    LikeModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
