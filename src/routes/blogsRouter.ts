import { Request, Response, Router } from 'express'
import { DB, TABLE } from '../data'
import {
    TypeOfRequestP, TypeOfRequestBody, TypeOfRequestP_Body,
    BlogViewModel, APIErrorResult, BlogInputModel
} from "../types/models"

import { admins } from "../data"
import basicAuth from "express-basic-auth"
import {body, Result, validationResult} from "express-validator";
import { blogVdChain } from "../inputValidation";

export const blogsRouter = Router({})

const db: DB = new DB()



blogsRouter.post('/', basicAuth({users: admins}), blogVdChain, (req: TypeOfRequestBody<BlogInputModel>, res: Response) => {

    const result: Result = validationResult(req)

    if (result.isEmpty()) {

        const newEntry: BlogViewModel = {
            id: db.nextID(TABLE.BLOGS),
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl
        }

        db.create(TABLE.BLOGS, newEntry)
        res.status(201).json(newEntry)

    } else {
    res.status(400).json({ errorsMessages: result.array().map(({ path, msg }) => ({ message: msg, field: path })) })
    }
})



blogsRouter.get('/', (req: Request, res: Response<Array<object | null>>) => {
    res.status(200).json(db.getAll(TABLE.BLOGS))
})



blogsRouter.get('/:id', (req: TypeOfRequestP<{id: string}>, res: Response<object | null>) => {

    if (!db.exists(TABLE.BLOGS, req.params.id)) {
        res.sendStatus(404)
    } else {
        res.status(200).json(db.get(TABLE.BLOGS, req.params.id))
    }
})



blogsRouter.put('/:id', basicAuth({users: admins}), blogVdChain, (req: TypeOfRequestP_Body<{id: string},
    BlogInputModel>, res: Response) => {
    if (!db.exists(TABLE.BLOGS, req.params.id)) {
        res.sendStatus(404)
    } else {

        const result: Result = validationResult(req)

        if (result.isEmpty()) {

            const updateEntry: BlogInputModel = {
                name: req.body.name,
                description: req.body.description,
                websiteUrl: req.body.websiteUrl
            }

            db.update(TABLE.BLOGS, req.params.id, updateEntry)
            res.sendStatus(204)

        } else {
            res.status(400).json({ errorsMessages: result.array().map(({ path, msg }) => ({ message: msg, field: path })) })
        }
    }
})



blogsRouter.delete('/:id', basicAuth({users: admins}), (req: TypeOfRequestP<{id: string}>, res: Response) => {
    res.sendStatus(db.delete(TABLE.BLOGS, req.params.id))
})




















/*
blogsRouter.post('/', (req: TypeOfRequestBody<CreateBlogInputModel>, res: Response<BlogModel | APIErrorResult>) => {
    if (!req.body) {
        res.sendStatus(400)
    } else {

        const result = validate.CreateVideo(req.body)

        if (result.Success) {
            const newEntry: BlogModel = {
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



blogsRouter.post('/:id', (req: TypeOfRequestP_Body<{id: string},
    UpdateBlogInputModel>, res: Response<BlogModel | APIErrorResult>) => {
    if (!req.body) {
        res.sendStatus(400)
    } else {

        const result = validate.CreateVideo(req.body)

        if (result.Success) {
            const newEntry: BlogModel = {
                id: db.nextID(TABLE.VIDEOS),
                title: req.body.title,
                author: req.body.author,
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: new Date().toISOString(),
                publicationDate: new Date(Date.now() + 86400000).toISOString(),
                availableResolutions: req.body.availableResolutions
            }
            db.createAtID(TABLE.VIDEOS, +req.params.id, newEntry)
            res.status(result.HTTPStatus).json(newEntry)
        } else {
            res.status(result.HTTPStatus).json(result.Response)
        }
    }
})



blogsRouter.get('/', (req: Request, res: Response<Array<object | null>>) => {
    res.status(200).json(db.getAll(TABLE.VIDEOS))
})



blogsRouter.get('/:id', (req: TypeOfRequestP<{id: string}>, res: Response<object | null>) => {

    if (!db.exists(TABLE.VIDEOS, +req.params.id)) {
        res.sendStatus(404)
    } else {
        res.status(200).json(db.get(TABLE.VIDEOS, +req.params.id))
    }
})



blogsRouter.put('/:id', (req: TypeOfRequestP_Body<{id: string},
    UpdateBlogInputModel>, res: Response<null | APIErrorResult>) => {

    if (!req.body) {
        res.sendStatus(400)
    } else if (!db.exists(TABLE.VIDEOS, +req.params.id)) {
        res.sendStatus(404)
    } else {

        const result = validate.UpdateVideo(req.body)

        if (result.Success) {
            const updateEntry: UpdateBlogInputModel = {
                title: req.body.title,
                author: req.body.author,
                canBeDownloaded: req.body.canBeDownloaded,
                minAgeRestriction: req.body.minAgeRestriction,
                publicationDate: req.body.publicationDate,
                availableResolutions: req.body.availableResolutions
            }
            db.update(TABLE.VIDEOS, +req.params.id, updateEntry)
            res.sendStatus(result.HTTPStatus)
        } else {
            res.status(result.HTTPStatus).json(result.Response)
        }
    }
})



blogsRouter.delete('/:id', (req: TypeOfRequestP<{id: string}>, res: Response) => {
    res.sendStatus(db.delete(TABLE.VIDEOS, +req.params.id))
})
*/