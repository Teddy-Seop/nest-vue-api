import { PostObjectType } from '../type/post.object.type';
import { Parent, ResolveField, Resolver, Int } from '@nestjs/graphql';
import { UserObjectType } from '@/graphql/user/type/user.object-type';
import { UserService } from '../../user/service/user.service';
import { CommentService } from '../../comment/service/comment.service';
import { Loader } from 'nestjs-dataloader';
import { CommentLoader } from '../loader/comment.loader';
import { CommentCountObjectType } from '@/graphql/comment/type/comment.object-type';
import * as DataLoader from 'dataloader';

@Resolver(of => PostObjectType)
export class PostSubResolver {
  constructor(
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  @ResolveField(returns => UserObjectType)
  public async writer(@Parent() post: PostObjectType): Promise<UserObjectType> {
    const user: UserObjectType = await this.userService.getUserById(
      post.userId,
    );

    return user;
  }

  @ResolveField(returns => CommentCountObjectType)
  public async commentCount(
    @Parent() post: PostObjectType,
    @Loader(CommentLoader.name)
    commentLoader: DataLoader<
      CommentCountObjectType['postId'],
      CommentCountObjectType
    >,
  ): Promise<CommentCountObjectType> {
    const result = await commentLoader.load(post.id);

    return result;
  }
}
