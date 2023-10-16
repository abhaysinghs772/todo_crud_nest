import {
    IsNotEmpty,
    IsEmail,
    IsString
} from 'class-validator';

export class LogInUserBody {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}