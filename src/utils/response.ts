import { HttpException, HttpStatus } from '@nestjs/common'

// define the respones for the REST endpoints, so that there is predictable response + less boilerplate
export const ResponseSuccess = async (message: string, data: Object) => {
    return {
        status: '200',
        message: message,
        data: data,
    }
}

export const ResponseError = async (message: string, data: Object) => {
    throw new HttpException(
        {
            status: '400',
            message: message,
            data: data,
        },
        HttpStatus.BAD_REQUEST,
    )
}

export const ResponseUnauthenticated = async (message: string, data: Object) => {
    throw new HttpException(
        {
            status: '403',
            message: message,
            data: data,
        },
        HttpStatus.FORBIDDEN,
    )
}
