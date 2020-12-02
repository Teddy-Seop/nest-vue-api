import { Injectable } from '@nestjs/common';
import { CommonPostService } from '@/services/common-post.service';
import { PostObjectType } from '../type/post.object.type';
import { PostInputType } from '../type/post.input-type';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CommonLikeService } from '@/services/common-like.service';
import { CommonCommentService } from '@/services/common-comment.service';

@Injectable()
export class PostService {
  constructor(
    private readonly commonPostService: CommonPostService,
    private readonly commonCommentService: CommonCommentService,
    private readonly commonLikeService: CommonLikeService,
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
    await this.commonCommentService.deleteCommentByPostId(postId);
    await this.commonLikeService.deleteLike({ postId });

    return true;
  }
}
