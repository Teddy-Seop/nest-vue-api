import { Injectable } from '@nestjs/common';
import { CommonPostService } from '@/services/common-post.service';
import { PostObjectType } from '../type/post.object.type';
import { CommonUserService } from '../../../services/common-user.service';

@Injectable()
export class PostService {
  constructor(
    private readonly commonPostService: CommonPostService,
    private readonly commonUserServie: CommonUserService,
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
}
