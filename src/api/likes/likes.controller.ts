import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesEntity } from '@/models/entities';
import { JwtAuthGuard } from '../../modules/auth/jwt.auth.guard';

@Controller('/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get(':likeId')
  public async getLike(@Param('likeId') likeId: number): Promise<LikesEntity> {
    let post: LikesEntity;
    try {
        post = await this.likesService.getLike(likeId);
    } catch (error) {
        throw new HttpException(`Not found like by ID: ${ likeId }`, HttpStatus.NOT_FOUND);
    }
    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  public async likePost(@Body() data: LikesEntity) {
    try {
      await this.likesService.likePost(data);
    } catch (error) {
      throw new HttpException(`Can't like this post`, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }
}
