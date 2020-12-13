import { UserEntity } from '@/models/entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ISaveUserInput } from '@/modules/adpater/user/user.interface';

@Injectable()
export class UserAdapterService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getUserById(userId: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOneOrFail(userId);

    return user;
  }

  public async getUser(email: string, password: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        email,
        password,
        deletedAt: null,
      },
    });

    return user;
  }

  public async saveUser(user: ISaveUserInput): Promise<boolean> {
    await this.userRepository.save(user);

    return true;
  }
}
