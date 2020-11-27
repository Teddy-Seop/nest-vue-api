import { UserEntity } from '@/models/entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CommonUserService {
  constructor(private readonly userRepository: Repository<UserEntity>) {}

  public async getUserById(userId: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOneOrFail(userId);

    return user;
  }

  public async getUserByPostId(postId: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOneOrFail({
      where: {
        postId,
      },
    });

    return user;
  }
}
