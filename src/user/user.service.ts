// src/user/user.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserBody, LogInUserBody } from 'src/dtos/index';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(body: CreateUserBody) {
    try {
      let incomingBody: CreateUserBody = body;

      // check whether user already exist in db or not if not then save it in Db
      let userExist = await this.userRepository.findOne({
        where: {
          email: incomingBody.email,
        },
      });

      if (userExist) {
        // throw error
        throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
      }

      let hashedPassword = await bcrypt.hash(incomingBody.password, 10);
      incomingBody.password = hashedPassword;
      await this.userRepository.create({ ...incomingBody });

      return { message: 'user signed up successfully' };
    } catch (error) {
      console.log(error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(body: LogInUserBody) {
    try {
      const { email, password } = body;

      // Check if the user exists
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      if (!user) {
        throw new HttpException(
          'user does not exist with the provided credentials please signup first',
          HttpStatus.BAD_REQUEST,
        );
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
      }

      // sign token
      const token = await jwt.sign(
        { userId: user.id },
        'some-secret-encrypeted',
        {
          expiresIn: '4h',
        },
      );

      return { message: 'successfully logged in', token };
    } catch (error) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async logout(body, token: string) {
    
  }
}
