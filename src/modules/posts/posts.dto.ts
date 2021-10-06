import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsNotEmpty, Length, IsNumberString } from 'class-validator'

// model Post {
//     id          Int       @default(autoincrement()) @id
//     createdAt   DateTime  @default(now())
//     // main_fields
//     title       String
//     author      User?     @relation(fields: [authorId], references: [id])
//     authorId    Int?
//   }

export class SearchParams {
    @IsNumberString()
    id: number
}

export class CreatePostWithAuthorIdDto {
    @IsNotEmpty()
    @Length(3, 100)
    title: string

    @IsNotEmpty()
    authorId: number
}

export class CreatePosWithEmailtDto {
    @IsNotEmpty()
    @Length(3, 100)
    title: string

    @IsNotEmpty()
    email: string
}
