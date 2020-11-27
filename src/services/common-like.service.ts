import { LikeEntity } from '@/models/entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CommonLikerService {
  constructor(private readonly likeRepository: Repository<LikeEntity>) {}

  public async getLike(likeId: number): Promise<LikeEntity> {
    const user: LikeEntity = await this.likeRepository.findOneOrFail(likeId);

    return user;
  }
}
