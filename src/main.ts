import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
// import { PrismaService } from './services/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    // return a valid error response when the DTO is invalid
    app.useGlobalPipes(new ValidationPipe())
    app.use(cookieParser())
    await app.listen(3000)
}
bootstrap()
