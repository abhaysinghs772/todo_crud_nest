import {
    IsString,
    IsEmail,
    IsNotEmpty
  } from 'class-validator';

export class CreateUserBody {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}