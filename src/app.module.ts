import { Module } from '@nestjs/common';
import { SessionModule } from 'nestjs-session';
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from './models';
import { AuthModule } from './modules/auth/auth.module';

import { PostModule } from './graphql/post/post.module';

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

    // GraphQL Modules
    PostModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
