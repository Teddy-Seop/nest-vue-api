import { Injectable } from '@nestjs/common';
import { CommonPostService } from '@/services/common-post.service';
import { PostObjectType } from '../type/post.object.type';
import { PostInputType } from '../type/post.input-type';
import { CommentService } from '@/graphql/comment/service/comment.service';
import { LikeService } from '@/graphql/like/service/like.service';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class PostService {
  constructor(
    private readonly commonPostService: CommonPostService,
    private readonly commentService: CommentService,
    private readonly likeService: LikeService,
  ) {}

  public async getPost(postId: number): Promise<PostObjectType> {
    const post: PostObjectType = await this.commonPostService.getPostById(
      postId,
    );

    return post;
  }

  public async getPostList(page?: number): Promise<PostObjectType[]> {
    const options = {
      skip: (page - 1) * 30,
      take: 30,
    };
    const postList: PostObjectType[] = await this.commonPostService.getPostList(
      options,
    );

    return postList;
  }

  public async savePost(post: PostInputType): Promise<boolean> {
    const result = await this.commonPostService.savePost(post);

    return result;
  }

  @Transactional()
  public async deletePost(postId: number): Promise<boolean> {
    await this.commonPostService.deletePost(postId);
    await this.commentService.deleteCommentByPostId(postId);
    await this.likeService.deleteLike(postId);

    return true;
  }
}
