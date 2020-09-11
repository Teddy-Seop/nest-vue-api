import { Controller, Get, Param, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsEntity } from '@/models/entities';

@Controller('/comments')
export class CommentsController {
  constructor(private readonly PostsService: CommentsService) {}

  @Get(':commentsId')
  public async getComment(@Param('commentsId') commentsId: number): Promise<CommentsEntity> {
    let post: CommentsEntity;
    try {
        post = await this.PostsService.getComment(commentsId);
    } catch (error) {
        throw new HttpException(`Not found comment by ID: ${ commentsId }`, HttpStatus.NOT_FOUND);
    }
    return post;
  }
}
