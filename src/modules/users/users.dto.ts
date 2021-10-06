import { IsEmail, IsNotEmpty, Length } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
// https://docs.nestjs.com/techniques/validation
// https://github.com/typestack/class-validator#usage

export class CreateUserDto {
    @IsNotEmpty()
    password: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @Length(3, 100)
    @IsNotEmpty()
    username: string
}

export class LoginUserDto {
    @IsNotEmpty()
    password: string

    @Length(3, 100)
    @IsNotEmpty()
    email: string
}

export class CurrentUser {
    userId: number
    username: string
    email: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
