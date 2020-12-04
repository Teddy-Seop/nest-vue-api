import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'nestjs-dataloader';
import { CommentCountObjectType } from '../../comment/type/comment.object-type';
import { CommentService } from '../../comment/service/comment.service';

@Injectable()
export class CommentLoader
  implements NestDataLoader<number, CommentCountObjectType> {
  constructor(private readonly commentService: CommentService) {}

  generateDataLoader(): DataLoader<number, CommentCountObjectType> {
    return new DataLoader<number, CommentCountObjectType>(async keys => {
      const commentCountList: CommentCountObjectType[] = await this.commentService.getCommentCount(
        <number[]>keys,
      );

      const result = keys.map(key => {
        const commentCount = commentCountList.filter(
          commentCount => commentCount.postId === key,
        );

        if (!commentCount[0]) {
          commentCount[0] = {
            postId: key,
            commentCount: 0,
          };
        }

        return commentCount[0];
      });

      return result;
    });
  }
}
