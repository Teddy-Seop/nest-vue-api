import { Injectable } from '@nestjs/common';
import { PostEntity } from '../models/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommonPostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  public async getPost(postId: number): Promise<PostEntity> {
    const post: PostEntity = await this.postRepository.findOneOrFail({
      where: {
        id: postId,
      },
    });

    return post;
  }
}
