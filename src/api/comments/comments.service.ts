import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from '@/models/entities/';

@Injectable()
export class CommentsService {

    constructor(@InjectRepository(CommentsEntity) private readonly commentsRepository: Repository<CommentsEntity>) {}

    public async getComment(commentId: number): Promise<CommentsEntity> {
        const comment = await this.commentsRepository.findOneOrFail({
            where: { id: commentId },
        });
        return comment;
    }
}