import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
  Body,
  Post,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentEntity } from '@/models/entities';
import { JwtAuthGuard } from '../../modules/auth/jwt.auth.guard';

@Controller('/comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  public async writeComment(@Body() comment: CommentEntity) {
    try {
      await this.commentService.writeComment(comment);
    } catch (error) {
      throw new HttpException(
        'Can not insert comment',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':postsId')
  public async getCommentsList(
    @Param('postsId') postsId: number,
  ): Promise<CommentEntity[]> {
    try {
      const commentsList: CommentEntity[] = await this.commentService.getCommentsList(
        postsId,
      );
      return commentsList;
    } catch (error) {
      throw new HttpException(
        'Can not get comments list',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async deleteComment(@Param('id') id: number) {
    try {
      await this.commentService.deleteComment(id);
    } catch (error) {
      throw new HttpException(
        'Can not delete comment',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
  }
}
