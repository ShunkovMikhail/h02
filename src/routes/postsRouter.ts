import { Request, Response, Router } from 'express'
import { DB, TABLE } from '../data'
import {
    TypeOfRequestP, TypeOfRequestBody, TypeOfRequestP_Body,
    PostViewModel, APIErrorResult, PostInputModel
} from "../types/models"

import { admins } from "../data"
import basicAuth from "express-basic-auth"
import { Result, validationResult } from "express-validator";
import { postVdChain } from "../inputValidation";

export const postsRouter = Router({})

const db: DB = new DB()



postsRouter.post('/', basicAuth({users: admins}), postVdChain, (req: TypeOfRequestBody<PostInputModel>, res: Response) => {

    const result: Result = validationResult(req);

    if (result.isEmpty()) {

        const newEntry: PostViewModel = {
            id: db.nextID(TABLE.POSTS),
            blogId: req.body.title,
            blogName: req.body.blogName,
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content
        }

        db.create(TABLE.POSTS, newEntry)
        res.status(201).json(newEntry)
    } else {
        res.status(400).json({ errorsMessages: result.array().map(({ path, msg }) => ({ message: msg, field: path })) })
    }
})



postsRouter.get('/', (req: Request, res: Response<Array<object | null>>) => {
    res.status(200).json(db.getAll(TABLE.BLOGS))
})



postsRouter.get('/:id', (req: TypeOfRequestP<{id: string}>, res: Response<object | null>) => {

    if (!db.exists(TABLE.POSTS, req.params.id)) {
        res.sendStatus(404)
    } else {
        res.status(200).json(db.get(TABLE.POSTS, req.params.id))
    }
})



postsRouter.put('/:id', basicAuth({users: admins}), postVdChain, (req: TypeOfRequestP_Body<{id: string},
    PostInputModel>, res: Response) => {
    if (!db.exists(TABLE.POSTS, req.params.id)) {
        res.sendStatus(404)
    } else {

        const result: Result = validationResult(req)

        if (result.isEmpty()) {

            const updateEntry: PostInputModel = {
                blogId: req.body.title,
                blogName: req.body.blogName,
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content
            }

            db.update(TABLE.POSTS, req.params.id, updateEntry)
            res.status(201).json(null)

        } else {
            res.status(400).json({ errorsMessages: result.array().map(({ path, msg }) => ({ message: msg, field: path })) })
        }
    }
})



postsRouter.delete('/:id', basicAuth({users: admins}), (req: TypeOfRequestP<{id: string}>, res: Response) => {
    res.sendStatus(db.delete(TABLE.POSTS, req.params.id))
})




















/*
postsRouter.post('/', (req: TypeOfRequestBody<PostInputModel>, res: Response<PostViewModel | APIErrorResult>) => {
    if (!req.body) {
        res.sendStatus(400)
    } else {

        const result = validate.CreateVideo(req.body)

        if (result.Success) {
            const newEntry: PostViewModel = {
                id: db.nextID(TABLE.VIDEOS),
                title: req.body.title,
                author: req.body.author,
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: new Date().toISOString(),
                publicationDate: new Date(Date.now() + 86400000).toISOString(),
                availableResolutions: req.body.availableResolutions
            }
            db.create(TABLE.VIDEOS, newEntry)
            res.status(result.HTTPStatus).json(newEntry)
        } else {
            res.status(result.HTTPStatus).json(result.Response)
        }
    }
})



postsRouter.post('/:id', (req: TypeOfRequestP_Body<{id: string},
    PostInputModel>, res: Response<PostViewModel | APIErrorResult>) => {
    if (!req.body) {
        res.sendStatus(400)
    } else {

        const result = validate.CreateVideo(req.body)

        if (result.Success) {
            const newEntry: PostViewModel = {
                id: db.nextID(TABLE.POSTS),
                title: req.body.title,
                author: req.body.author,
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: new Date().toISOString(),
                publicationDate: new Date(Date.now() + 86400000).toISOString(),
                availableResolutions: req.body.availableResolutions
            }
            db.createAtID(TABLE.POSTS, +req.params.id, newEntry)
            res.status(result.HTTPStatus).json(newEntry)
        } else {
            res.status(result.HTTPStatus).json(result.Response)
        }
    }
})



postsRouter.get('/', (req: Request, res: Response<Array<object | null>>) => {
    res.status(200).json(db.getAll(TABLE.POSTS))
})



postsRouter.get('/:id', (req: TypeOfRequestP<{id: string}>, res: Response<object | null>) => {

    if (!db.exists(TABLE.POSTS, +req.params.id)) {
        res.sendStatus(404)
    } else {
        res.status(200).json(db.get(TABLE.POSTS, +req.params.id))
    }
})



postsRouter.put('/:id', (req: TypeOfRequestP_Body<{id: string},
    PostInputModel>, res: Response<null | APIErrorResult>) => {

    if (!req.body) {
        res.sendStatus(400)
    } else if (!db.exists(TABLE.POSTS, +req.params.id)) {
        res.sendStatus(404)
    } else {

        const result = validate.UpdateVideo(req.body)

        if (result.Success) {
            const updateEntry: PostViewModel = {
                title: req.body.title,
                author: req.body.author,
                canBeDownloaded: req.body.canBeDownloaded,
                minAgeRestriction: req.body.minAgeRestriction,
                publicationDate: req.body.publicationDate,
                availableResolutions: req.body.availableResolutions
            }
            db.update(TABLE.POSTS, +req.params.id, updateEntry)
            res.sendStatus(result.HTTPStatus)
        } else {
            res.status(result.HTTPStatus).json(result.Response)
        }
    }
})



postsRouter.delete('/:id', (req: TypeOfRequestP<{id: string}>, res: Response) => {
    res.sendStatus(db.delete(TABLE.POSTS, +req.params.id))
})
*/