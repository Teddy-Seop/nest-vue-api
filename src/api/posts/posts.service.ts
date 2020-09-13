import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsEntity, UserEntity } from '@/models/entities/';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getPostList(): Promise<Array<PostsEntity>> {
    const postList = await this.postsRepository.find();
    return postList;
  }

  public async getPost(postId: number): Promise<PostsEntity> {
    const post = await this.postsRepository.findOneOrFail({
      where: { id: postId },
    });
    return post;
  }

  public async addPost(post: PostsEntity) {
    await this.postsRepository.insert(post);
  }

  public async test(): Promise<PostsEntity> {
    const post = await this.postsRepository.findOne({
      where: {
        id: 1,
      },
    });
    const user = await this.userRepository.findOne({
      where: {
        id: post.userId,
      },
    });
    post.user = user;
    console.log(post);
    return post;
  }
}
