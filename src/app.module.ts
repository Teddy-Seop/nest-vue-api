import { Module } from '@nestjs/common';
import { SessionModule } from 'nestjs-session';
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from './models';

import { PostModule } from './graphql/post/post.module';
import { UserModule } from './graphql/user/user.module';
import { CommentModule } from './graphql/comment/comment.module';
import { LikeModule } from './graphql/like/like.module';
import { AuthModule } from './modules/auth/auth.module';
import { Upload } from './modules/upload/upload';

@Module({
  imports: [
    // Global Modules
    DatabaseModule.forRoot(),
    SessionModule.forRoot({
      session: { secret: 'keyboard cat' },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      uploads: {
        maxFileSize: 10000000, // 10 MB
        maxFiles: 5,
      },
    }),
    AuthModule,
    Upload,

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
