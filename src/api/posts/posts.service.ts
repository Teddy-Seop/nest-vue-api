import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsEntity, UserEntity } from '@/models/entities/';
import { listeners } from 'process';
import { IPostList } from '@/type/post';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getPostList() {
    return this.postsRepository.find({
      relations: ['user', 'likes', 'comments'],
    })
    .then(postList => {
      if (!postList) { throw new HttpException(`Can't get post list`, HttpStatus.METHOD_NOT_ALLOWED); }
      const return_value: IPostList[] = postList.map(post => {
        return {
          id: post.id,
          title: post.title,
          contents: post.contents,
          commentCount: post.comments.length,
          likeCount: post.likes.length,
          writer: post.user.name,
          createdAt: post.createdAt,
        }
      })

      return return_value;
    })
  }

  public async getPost(postId: number): Promise<PostsEntity> {
    const post = await this.postsRepository.findOneOrFail({
      where: { id: postId },
      relations: ['user', 'likes'],
    });
    return post;
  }

  public async addPost(post: PostsEntity) {
    await this.postsRepository.save(post);
  }

  public async deletePost(postId: number) {
    await this.postsRepository
    .createQueryBuilder('posts')
    .delete()
    .where("id = :postId", { postId })
    .execute();
  }

  public async getMostLikes() {
    const return_value = await this.postsRepository
    .createQueryBuilder('posts')
    .leftJoinAndSelect('posts.likes', 'likes')
    .loadRelationCountAndMap('posts.likes', 'posts.likes')
    .getMany()
    .then(mostLikesList => {
      return mostLikesList.sort((a, b) => {
        return a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0;
      })
    })

    return return_value.slice(0, 5);
  }

  public async getMostComments() {
    const return_value = await this.postsRepository
    .createQueryBuilder('posts')
    .leftJoinAndSelect('posts.comments', 'comments')
    .loadRelationCountAndMap('posts.comments', 'posts.comments')
    .getMany()
    .then(mostCommentsList => {
      return mostCommentsList.sort((a, b) => {
        return a.comments < b.comments ? 1 : a.comments > b.comments ? -1 : 0;
      })
    })

    return return_value.slice(0, 5);
  }
}
