import { Controller, Get, Param, HttpException, HttpStatus, UseGuards, Body, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsEntity } from '@/models/entities';
import { JwtAuthGuard } from '../../modules/auth/jwt.auth.guard';

@Controller('/comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  public async writeComment(@Body() comment: CommentsEntity) {
    try {
      await this.commentService.writeComment(comment);
    } catch (error) {
      throw new HttpException(`Can't insert comment`, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':postsId')
  public async getCommentsList(@Param('postsId') postsId: number): Promise<CommentsEntity[]> {
    try {
      const commentsList: CommentsEntity[] = await this.commentService.getCommentsList(postsId);
      return commentsList;
    } catch (error) {
      throw new HttpException(`Can't get comments list`, HttpStatus.METHOD_NOT_ALLOWED);
    }
}
}
