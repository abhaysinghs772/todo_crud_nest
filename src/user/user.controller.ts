// src/todo/todo.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserBody, LogInUserBody } from 'src/dtos/index';
import {AuthGuard} from '../guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Post('signup')
  async signup(@Body() body: CreateUserBody): Promise<{}> {
    return this.userService.signUp(body);
  }

  @Post('login')
  async login(@Body() body: LogInUserBody): Promise<{}> {
    return this.userService.login(body);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Body() body, @Request() request) {
    const token = request.headers.authorization?.split(' ')[1];
    return this.userService.logout(body, token);
  }
}
