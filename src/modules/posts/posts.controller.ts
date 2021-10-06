import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { PostsService } from './posts.service'
// import { UpdatePostDto, CreatePostDto } from './posts.dto'
import * as dto from './posts.dto'

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post('authorId')
    createWithId(@Body() DTO: dto.CreatePostWithAuthorIdDto) {
        return this.postsService.createWithId(DTO)
    }

    @Post('email')
    createWithEmail(@Body() DTO: dto.CreatePosWithEmailtDto) {
        return this.postsService.createWithEmail(DTO)
    }

    @Get()
    findAll() {
        return this.postsService.findAll()
    }

    // SearchParams
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(+id)
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() DTO: dto.CreatePostWithAuthorIdDto) {
    //     return this.postsService.update(+id, DTO)
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id)
    }
}
