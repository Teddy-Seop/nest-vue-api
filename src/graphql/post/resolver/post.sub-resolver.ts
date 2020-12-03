import { PostObjectType } from '../type/post.object.type';
import { Parent, ResolveField, Resolver, Int } from '@nestjs/graphql';
import { UserObjectType } from '@/graphql/user/type/user.object-type';
import { UserService } from '../../user/service/user.service';
import { Loader } from 'nestjs-dataloader';
import { CommentLoader } from '../loader/comment.loader';
import { CommentCountObjectType } from '@/graphql/comment/type/comment.object-type';
import * as DataLoader from 'dataloader';
import { LikeCountObjectType } from '../../like/type/like.object-type';
import { LikeLoader } from '../loader/like.loader';
import { CommentObjectType } from '../../comment/type/comment.object-type';
import { CommonCommentService } from '@/services/common-comment.service';

@Resolver(of => PostObjectType)
export class PostSubResolver {
  constructor(private readonly userService: UserService,
    private readonly commonCommentService: CommonCommentService) {}

  @ResolveField(returns => UserObjectType)
  public async writer(@Parent() post: PostObjectType): Promise<UserObjectType> {
    const user: UserObjectType = await this.userService.getUserById(
      post.userId,
    );

    return user;
  }

  @ResolveField(returns => [CommentObjectType])
  public async comments(@Parent() post: PostObjectType): Promise<CommentObjectType[]> {
    const comments: CommentObjectType[] = await this.commonCommentService.getCommentListByPostId(post.id);

    return comments;
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
    const commentCount: CommentCountObjectType = await commentLoader.load(
      post.id,
    );

    return commentCount;
  }

  @ResolveField(returns => LikeCountObjectType)
  public async likeCount(
    @Parent() post: PostObjectType,
    @Loader(LikeLoader.name)
    likeLoader: DataLoader<LikeCountObjectType['postId'], LikeCountObjectType>,
  ): Promise<LikeCountObjectType> {
    const likeCount: LikeCountObjectType = await likeLoader.load(post.id);

    return likeCount;
  }
}
