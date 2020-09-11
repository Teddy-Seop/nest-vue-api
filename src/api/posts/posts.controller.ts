import { Controller, Get, Param, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsEntity } from '@/models/entities';

@Controller('/posts')
export class PostsController {
  constructor(private readonly PostsService: PostsService) {}

  @Get(':postId')
  public async getPost(@Param('postId') postId: number): Promise<PostsEntity> {
    let post: PostsEntity;
    try {
        post = await this.PostsService.getPost(postId);
    } catch (error) {
        throw new HttpException(`Not found post by ID: ${ postId }`, HttpStatus.NOT_FOUND);
    }
    return post;
  }
}
