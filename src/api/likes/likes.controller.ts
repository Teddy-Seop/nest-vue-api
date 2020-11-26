import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikeEntity } from '@/models/entities';
import { JwtAuthGuard } from '../../modules/auth/jwt.auth.guard';

@Controller('/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get(':likeId')
  public async getLike(@Param('likeId') likeId: number): Promise<LikeEntity> {
    let post: LikeEntity;
    try {
      post = await this.likesService.getLike(likeId);
    } catch (error) {
      throw new HttpException(
        `Not found like by ID: ${likeId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  public async likePost(@Body() data: LikeEntity) {
    try {
      await this.likesService.likePost(data);
    } catch (error) {
      throw new HttpException(
        'Can not like this post',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:postsId/:userId')
  public async unlikePost(
    @Param('postsId') postsId: number,
    @Param('userId') userId: number,
  ) {
    try {
      await this.likesService.unlikePost(postsId, userId);
    } catch (error) {
      throw new HttpException(
        'Can not like this post',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
  }
}
