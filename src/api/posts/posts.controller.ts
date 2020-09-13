import {
  Controller,
  Get,
  Post,
  Param,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsEntity } from '@/models/entities';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('')
  public async getPostList(): Promise<Array<PostsEntity>> {
    let postList: Array<PostsEntity>;
    try {
      postList = await this.postsService.getPostList();
    } catch {
      throw new HttpException(`Can't get post list`, HttpStatus.NOT_FOUND);
    }
    return postList;
  }

  @Get(':postId')
  public async getPost(@Param('postId') postId: number): Promise<PostsEntity> {
    let post: PostsEntity;
    try {
      post = await this.postsService.getPost(postId);
    } catch (error) {
      throw new HttpException(
        `Not found post by ID: ${postId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return post;
  }

  @Post('')
  public async addPost(@Body() post: PostsEntity) {
    console.log(post);
    try {
      await this.postsService.addPost(post);
    } catch {
      throw new HttpException(`Can't insert post`, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/test/test')
  public async test(): Promise<PostsEntity> {
    const test = await this.postsService.test();
    return test;
  }
}
