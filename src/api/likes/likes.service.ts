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

    public async likePost(data: LikesEntity) {
        await this.likesRepository.save(data);
    }

    public async unlikePost(postsId: number, userId: number) {
        await this.likesRepository
        .createQueryBuilder('likes')
        .delete()
        .where("postsId = :postsId AND userId = :userId", { postsId, userId })
        .execute();
    }
}