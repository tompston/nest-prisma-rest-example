import { Module } from '@nestjs/common'
import { PostsModule } from '../modules/posts/posts.module'
import { UsersModule } from '../modules/users/users.module'
// import { AppController } from './app.controller';

@Module({
    imports: [PostsModule, UsersModule],
})
export class AppModule {}
