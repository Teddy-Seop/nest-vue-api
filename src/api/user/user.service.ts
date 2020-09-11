import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/models/entities/user.entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    public async getUser(userId: number): Promise<UserEntity> {
        const userEntity = await this.userRepository.findOneOrFail({
            where: { id: userId },
        });
        return userEntity;
    }
}