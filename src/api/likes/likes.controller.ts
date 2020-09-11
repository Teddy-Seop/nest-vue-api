import { Controller, Get, Param, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesEntity } from '@/models/entities';

@Controller('/likes')
export class LikesController {
  constructor(private readonly LikesService: LikesService) {}

  @Get(':likeId')
  public async getLike(@Param('likeId') likeId: number): Promise<LikesEntity> {
    let post: LikesEntity;
    try {
        post = await this.LikesService.getLike(likeId);
    } catch (error) {
        throw new HttpException(`Not found like by ID: ${ likeId }`, HttpStatus.NOT_FOUND);
    }
    return post;
  }
}
