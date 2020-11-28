import { Injectable } from '@nestjs/common';
import { CommonPostService } from '@/services/common-post.service';
import { PostObjectType } from '../type/post.object.type';
import { PostInputType } from '../type/post.input-type';

@Injectable()
export class PostService {
  constructor(private readonly commonPostService: CommonPostService) {}

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

  public async deletePost(postId: number): Promise<boolean> {
    const result = await this.commonPostService.deletePost(postId);

    return result;
  }
}
