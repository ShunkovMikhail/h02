import { Request } from 'express'

export type TypeOfRequestBody< T > = Request< {},{},T >
export type TypeOfRequestP< T > = Request< T >
//export type TypeOfRequestQuery< T > = Request< {},{},{},T >
export type TypeOfRequestP_Body< T,U > = Request< T,{},U >

export type BlogViewModel = {
    id: string
    name: string
    description: string
    websiteUrl: string
}

export type BlogInputModel = {
    name: string
    description: string
    websiteUrl: string
}

export type PostViewModel = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}

export type PostInputModel = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export type APIErrorResult = {
    errorsMessages: FieldError[]
}

export type FieldError = {
    message: string | null
    field: string | null
}


