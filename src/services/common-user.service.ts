import { UserEntity } from '@/models/entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommonUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getUserById(userId: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOneOrFail(userId);

    return user;
  }
}
