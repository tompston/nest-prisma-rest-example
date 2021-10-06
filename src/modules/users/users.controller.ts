import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto, CreateUserDto, LoginUserDto } from './users.dto'
import { Prisma, User } from '.prisma/client'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    register(@Body() DTO: CreateUserDto) {
        return this.usersService.register(DTO)
    }

    @Post('login')
    login(@Body() LoginUserDto: LoginUserDto) {
        return this.usersService.login(LoginUserDto)
    }

    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    // test
    @Get('test')
    test() {
        return this.usersService.test()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id)
    }
}
