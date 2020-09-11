import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikesEntity } from '@/models/entities/';

@Injectable()
export class LikesService {

    constructor(@InjectRepository(LikesEntity) private readonly likesRepository: Repository<LikesEntity>) {}

    public async getLike(postId: number): Promise<LikesEntity> {
        const like = await this.likesRepository.findOneOrFail({
            where: { id: postId },
        });
        return like;
    }
}