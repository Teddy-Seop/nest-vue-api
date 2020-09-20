import {
  Controller,
  Get,
  Post,
  Param,
  HttpException,
  HttpStatus,
  Body,
  Session,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserEntity } from '@/models/entities';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  public async getUser(@Param('userId') userId: number): Promise<UserEntity> {
    let userEntity: UserEntity;

    try {
      userEntity = await this.userService.getUser(userId);
    } catch (error) {
      throw new HttpException(
        `Not found user by ID: ${userId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return userEntity;
  }

  @Post('login')
  public async login(
    @Res() response: Response,
    @Body() user: UserEntity,
    @Session() session,
  ) {
    try {
      const validation: boolean = await this.userService.login(user);

      if (validation === true) {
        session.auth = user.id;
        response.status(HttpStatus.OK).json(user);
      } else {
        response.status(HttpStatus.UNAUTHORIZED).json(user);
      }
    } catch (error) {
      throw new HttpException(`Not found user`, HttpStatus.UNAUTHORIZED);
    }
  }
}
