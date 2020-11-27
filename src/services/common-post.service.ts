import { Injectable } from '@nestjs/common';
import { PostEntity } from '../models/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOption } from '@/type/post';

@Injectable()
export class CommonPostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  public async getPostById(postId: number): Promise<PostEntity> {
    const post: PostEntity = await this.postRepository.findOneOrFail({
      where: {
        id: postId,
      },
    });

    return post;
  }

  public async getPostList(options?: IPaginationOption): Promise<PostEntity[]> {
    const postList: PostEntity[] = await this.postRepository.find(options);

    return postList;
  }
}
