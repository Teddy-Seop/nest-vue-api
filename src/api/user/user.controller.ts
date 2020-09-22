import { Controller, Get, Post, Param, HttpException, HttpStatus, Body, Session, Res, Req, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserEntity } from '@/models/entities';
import { LocalAuthGuard } from '../../modules/auth/local-auth.guard';

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

  // @Post('login')
  // public async login(
  //   @Res() response: Response,
  //   @Body() user: UserEntity,
  //   @Session() session,
  // ) {
  //   try {
  //     const validation: boolean = await this.userService.login(user);

  //     if (validation === true) {
  //       session.auth = user.id;
  //       response.status(HttpStatus.OK).json(user);
  //     } else {
  //       response.status(HttpStatus.UNAUTHORIZED).json(user);
  //     }
  //   } catch (error) {
  //     throw new HttpException(`Not found user`, HttpStatus.UNAUTHORIZED);
  //   }
  // }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Body() user: UserEntity, @Session() session, @Req() req) {
    session.auth = user.id;
    return req.user;
  }
}
