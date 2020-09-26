import { Controller, Get, Post, Param, HttpException, HttpStatus, Body, UseGuards, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsEntity } from '@/models/entities';

import { JwtAuthGuard } from '../../modules/auth/jwt.auth.guard';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post('')
  public async addPost(@Body() post: PostsEntity) {
    try {
      await this.postsService.addPost(post);
    } catch (error) {
      throw new HttpException(`Can't insert post`, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  public async deletePost(@Param('postId') postId: number) {
    try {
      console.log('test')
      await this.postsService.deletePost(postId);

      return "OK";
    } catch (error) {
      console.log(error);
      throw new HttpException(`Can't delete ${postId}`, HttpStatus.METHOD_NOT_ALLOWED)
    }
  }
}
