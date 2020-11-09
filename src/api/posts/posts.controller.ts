import { Controller, Get, Post, Param, HttpException, HttpStatus, Body, UseGuards, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsEntity } from '@/models/entities';
import { JwtAuthGuard } from '../../modules/auth/jwt.auth.guard';
import { IPostList } from '@/type/post';
import { PostsDto } from './dto/posts.dto';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get('')
  // public async getPostList(): Promise<IPostList[]> {
  //   let postList: IPostList[];
  //   try {
  //     postList = await this.postsService.getPostList();
  //     return postList;
  //   } catch {
  //     throw new HttpException(`Can't get post list`, HttpStatus.METHOD_NOT_ALLOWED);
  //   }
  // }

  @UseGuards(JwtAuthGuard)
  @Get(':postId')
  public async getPost(@Param('postId') postId: number): Promise<PostsEntity> {
    try {
      const post: PostsEntity = await this.postsService.getPost(postId);
      return post;
    } catch (error) {
      throw new HttpException(
        `Not found post by ID: ${postId}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/top/likes')
  public async getMostLikes(): Promise<PostsEntity[]> {
    try {
      return await this.postsService.getMostLikes();
    } catch {
      throw new HttpException(`Can't get top likes post`, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/top/comments')
  public async getMostComments(): Promise<PostsEntity[]>{
    try {
      return await this.postsService.getMostComments();
    } catch {
      throw new HttpException(`Can't get top comments post`, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  public async addPost(@Body() data: PostsDto) {
    try {
      await this.postsService.addPost(data);
    } catch (error) {
      throw new HttpException(`Can't insert post`, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  public async deletePost(@Param('postId') postId: number) {
    try {
      await this.postsService.deletePost(postId);

      return "OK";
    } catch (error) {
      console.log(error);
      throw new HttpException(`Can't delete ${postId}`, HttpStatus.METHOD_NOT_ALLOWED)
    }
  }
}
