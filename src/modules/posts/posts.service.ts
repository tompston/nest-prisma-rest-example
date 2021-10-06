import { Injectable } from '@nestjs/common'
import * as dto from './posts.dto'
import * as response from '../../utils/response'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    // If you want to create a new record that has a @relation field to another model, you can use any of the fields
    // that identify the referenced model. For example, in this case we can use the email or username to create a new post.
    //
    // 1. assign the payload DTO to individual variables so you can pass it to the query
    // 2. pass the assigned variables to the create query.
    //      we can define the connect: {} object to have this structure
    //              * if using the already defined reference in the @relations field
    //                          connect: { REFERENCES: FIELDS }
    //              * if using a field that is not used as a reference
    //                          connect: { ORIGINAL_NAME_OF_THE_FIELD_FROM_REFERENCED_MODEL: REFERENCE_TO_THE_ORIGINAL_FIELD }
    //
    // There are 2 services as an example for this. First one uses the users id to create the post.
    // The second one uses the users email.

    async createWithId(DTO: dto.CreatePostWithAuthorIdDto) {
        // check if user exists. When auth is implemented, remove this.
        const user = await this.prisma.user.findUnique({ where: { id: DTO.authorId } })
        if (!user) {
            return response.ResponseError('User does not exist', null)
        }
        const title = DTO.title
        const authorId = DTO.authorId
        const post = await this.prisma.post.create({ data: { title, author: { connect: { id: authorId } } } })
        return response.ResponseSuccess('New Post Created!', post)
    }

    async createWithEmail(DTO: dto.CreatePosWithEmailtDto) {
        // check if user exists. When auth is implemented, remove this
        const user = await this.prisma.user.findUnique({ where: { email: DTO.email } })
        if (!user) {
            return response.ResponseError('User does not exist', null)
        }
        const title = DTO.title
        const authorEmail = DTO.email
        const post = await this.prisma.post.create({
            data: { title, author: { connect: { email: authorEmail } } },
        })
        return response.ResponseSuccess('New Post Created!', post)
    }

    async findAll() {
        const posts = await this.prisma.post.findMany()
        if (!posts) {
            return response.ResponseError('No posts exist!', null)
        }
        return response.ResponseSuccess('All posts', posts)
    }

    async findOne(id: number) {
        // validate the url param
        if (!Number.isInteger(id)) {
            return response.ResponseError('Need to provide a number!', null)
        }
        // check if post exists
        const post = await this.prisma.post.findUnique({ where: { id } })
        // if doesn't exist, throw error
        if (!post) {
            return response.ResponseError('No such post exists', null)
        }
        return await response.ResponseSuccess('post', post)
    }

    async remove(id: number) {
        // validate the url param
        if (!Number.isInteger(id)) {
            return response.ResponseError('Need to provide a number!', null)
        }
        // check if post exists
        const post = await this.prisma.post.findUnique({ where: { id } })
        // if doesn't exist, throw error
        if (!post) {
            return response.ResponseError('No such post exists', null)
        }
        const deletePost = await this.prisma.post.delete({ where: { id: id } })
        return await response.ResponseSuccess(`Post with id ${id} deleted!`, null)
    }
}
