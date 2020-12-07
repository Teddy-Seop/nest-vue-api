import { Injectable } from '@nestjs/common';
import { PostObjectType } from '../type/post.object.type';
import { PostInputType } from '../type/post.input-type';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CommentCountObjectType } from '@/graphql/comment/type/comment.object-type';
import { LikeCountObjectType } from '@/graphql/like/type/like.object-type';
import { PostAdapterService } from '@/modules/adpater/post/post.adapter.service';
import { CommentAdapterService } from '@/modules/adpater/comment/comment.adapter.service';
import { LikeAdapterService } from '@/modules/adpater/like/like.adapter.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postAdapterService: PostAdapterService,
    private readonly commentAdapterService: CommentAdapterService,
    private readonly likeAdapterService: LikeAdapterService,
  ) {}

  public async getPost(postId: number): Promise<PostObjectType> {
    const post: PostObjectType = await this.postAdapterService.getPostById(
      postId,
    );

    return post;
  }

  public async getPostList(page: number): Promise<PostObjectType[]> {
    const options = {
      skip: (page - 1) * 30,
      take: 30,
    };
    const postList: PostObjectType[] = await this.postAdapterService.getPostList(
      options,
    );

    return postList;
  }

  public async getPostCount(): Promise<number> {
    const count: number = await this.postAdapterService.getPostCount();

    return count;
  }

  public async getTopLikePostList(): Promise<PostObjectType[]> {
    const likeCountList: LikeCountObjectType[] = await this.likeAdapterService.getLikeCount();

    const topLikeCountList: LikeCountObjectType[] = likeCountList
      .sort((target1, target2) => {
        return target1.likeCount > target2.likeCount
          ? -1
          : target1.likeCount < target2.likeCount
          ? 1
          : 0;
      })
      .slice(0, 5);

    const postIds: number[] = topLikeCountList.map(topLikeCount => {
      return topLikeCount.postId;
    });

    const postList: PostObjectType[] = await this.postAdapterService.getPostListByIds(
      postIds,
    );

    return postList;
  }

  public async getTopCommentPostList(): Promise<PostObjectType[]> {
    const commentCountList: CommentCountObjectType[] = await this.commentAdapterService.getCommentCount();

    const topCommentCountList: CommentCountObjectType[] = commentCountList
      .sort((target1, target2) => {
        return target1.commentCount > target2.commentCount
          ? -1
          : target1.commentCount < target2.commentCount
          ? 1
          : 0;
      })
      .slice(0, 5);

    const postIds: number[] = topCommentCountList.map(topCommentCount => {
      return topCommentCount.postId;
    });

    const postList: PostObjectType[] = await this.postAdapterService.getPostListByIds(
      postIds,
    );

    return postList;
  }

  public async savePost(post: PostInputType): Promise<boolean> {
    const result = await this.postAdapterService.savePost(post);

    return result;
  }

  @Transactional()
  public async deletePost(postId: number): Promise<boolean> {
    await this.postAdapterService.deletePost(postId);
    await this.commentAdapterService.deleteCommentByPostId(postId);
    await this.likeAdapterService.deleteLike({ postId });

    return true;
  }
}
