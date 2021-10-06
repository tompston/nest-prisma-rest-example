import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { Prisma } from '.prisma/client'
import * as bcrypt from 'bcrypt'
import * as dto from './users.dto'
import * as response from '../../utils/response'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async register(DTO: dto.CreateUserDto) {
        // check if the email already exists, as it has a unique constraint. Pass the email from the DTO to the query
        const user = await this.prisma.user.findUnique({ where: { email: DTO.email } })
        // if user with the passed in email already exists, throw an error
        if (user) {
            return response.ResponseError('Email already exists!', null)
        }
        // now hash the password that is sent to the server
        const hash = await bcrypt.hash(DTO.password, 11)
        // assign the hashed password to be the password for the json object
        DTO.password = hash
        const createUser = await this.prisma.user.create({ data: DTO })
        return await response.ResponseSuccess('User Created!', createUser)
    }

    async login(DTO: dto.LoginUserDto) {
        // check if the email already exists, as it has a unique constraint. Pass the email from the DTO to the query
        const user = await this.prisma.user.findUnique({ where: { email: DTO.email } })
        // if user with the passed in email does not exists, return error resonse
        if (!user) {
            return response.ResponseError('User does not exist', null)
        }
        const PasswordsMatch = await bcrypt.compare(DTO.password, user.password)
        // if passwords don't match, throw error
        if (!PasswordsMatch) {
            return response.ResponseError('Incorrect Password', null)
        }
        console.log(user)
        return user
    }

    async findAll() {
        //// return all users with all fields
        // return this.prisma.user.findMany()
        const data = await this.prisma.user.findMany({ select: { email: true, username: true, id: true, password: true } })
        return await response.ResponseSuccess('All Users', data)
    }

    async findOne(id: number) {
        // validate the url param
        if (!Number.isInteger(id)) {
            return response.ResponseError('Need to provide a number!', null)
        }
        const user = await this.prisma.user.findUnique({ where: { id } })
        if (!user) {
            return response.ResponseError('No such user exists', null)
        }
        return await response.ResponseSuccess('User', user)
    }

    async update(id: number, DTO: dto.UpdateUserDto) {
        // validate the url param
        if (!Number.isInteger(id)) {
            return response.ResponseError('Need to provide a number!', null)
        }
        return `This action updates a #${id} user`
    }

    async remove(id: number) {
        // validate the url param
        if (!Number.isInteger(id)) {
            return response.ResponseError('Need to provide a number!', null)
        }
        const user = await this.prisma.user.findUnique({ where: { id } })
        if (!user) {
            return response.ResponseError('No such user exists', null)
        }
        const deleteUser = await this.prisma.user.delete({ where: { id: id } })
        return await response.ResponseSuccess(`User with id ${id} deleted!`, null)
    }

    async test() {
        return 'howdy'
    }
}
