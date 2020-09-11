import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsEntity } from '@/models/entities/';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(PostsEntity) private readonly postsRepository: Repository<PostsEntity>) {}

    public async getPost(postId: number): Promise<PostsEntity> {
        const post = await this.postsRepository.findOneOrFail({
            where: { id: postId },
        });
        return post;
    }
}