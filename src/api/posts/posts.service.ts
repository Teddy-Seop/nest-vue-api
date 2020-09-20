import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsEntity, UserEntity } from '@/models/entities/';
import { listeners } from 'process';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getPostList() {
    const postList = await this.postsRepository.find({
      relations: ['user'],
    });
    return postList;
  }

  public async getPost(postId: number): Promise<PostsEntity> {
    const post = await this.postsRepository.findOneOrFail({
      where: { id: postId },
      relations: ['user'],
    });
    return post;
  }

  public async addPost(post: PostsEntity) {
    await this.postsRepository.insert(post);
  }

  public async test(): Promise<PostsEntity> {
    return null;
  }
}
