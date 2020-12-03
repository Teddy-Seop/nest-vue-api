import { Injectable } from '@nestjs/common';
import { PostEntity } from '../models/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOption, IPostInput } from '@/type/post.type';

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
        deletedAt: null,
      },
    });

    return post;
  }

  public async getPostList(options?: IPaginationOption): Promise<PostEntity[]> {
    const postList: PostEntity[] = await this.postRepository.find({
      ...options,
      where: {
        deletedAt: null,
      },
    });

    return postList;
  }

  public async getPostCount(): Promise<number> {
    const count: number = await this.postRepository.count();

    return count;
  }

  public async savePost(post: IPostInput): Promise<boolean> {
    await this.postRepository.save(post);

    return true;
  }

  public async deletePost(postId: number): Promise<boolean> {
    await this.postRepository.softDelete(postId);

    return true;
  }
}
