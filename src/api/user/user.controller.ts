import { Controller, Get, Param, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '@/models/entities';

@Controller('/user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get(':userId')
  public async getUser(@Param('userId') userId: number): Promise<UserEntity> {
    let userEntity: UserEntity;

    try {
        userEntity = await this.UserService.getUser(userId);
    } catch (error) {
        throw new HttpException(`Not found user by ID: ${ userId }`, HttpStatus.NOT_FOUND);
    }
    return userEntity;
  }
}
