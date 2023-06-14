import { APIErrorResult, BlogInputModel, BlogViewModel,
    FieldError, PostInputModel, PostViewModel } from "./types/models"
import { Request } from 'express'
import { body } from "express-validator";
import { DB, TABLE } from './data'

const urlRGX = new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')

const db: DB = new DB()



const urlRGXValidation = (value: string) => {
    if (!urlRGX.test(value)) {
        throw new Error('Incorrect regex!')
    }
}



const blogExists = (id: string) => {
    if (!db.exists(TABLE.BLOGS, +id)) {
        throw new Error('blogId does not exist!')
    }
}



export const blogVdChain = [

    body('name', 'Incorrect format!')
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 15}).withMessage('Too many characters! (maxLength: 15)'),

    body('description', 'Incorrect format!')
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 500}).withMessage('Too many characters! (maxLength: 500)'),

    body('websiteUrl', 'Incorrect format!')
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 100}).withMessage('Too many characters! (maxLength: 100)')
        .bail()
        .custom(value => urlRGXValidation(value))

]



export const postVdChain = [

    body('blogId', 'Incorrect id!')
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 64})
        .bail()
        .custom(id => blogExists(id)),

    body('title', 'Incorrect format!')
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 30}).withMessage('Too many characters! (maxLength: 30)'),

    body('shortDescription', 'Incorrect format!')
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 100}).withMessage('Too many characters! (maxLength: 100)'),

    body('content', 'Incorrect format!')
        .notEmpty()
        .bail()
        .isLength({min: 1, max: 1000}).withMessage('Too many characters! (maxLength: 1000)')

]






















/*
    CreateVideo(input: CreateVideoInputModel): { HTTPStatus: number, Response: undefined | APIErrorResult, Success: boolean } {

        let errors: FieldError[] = []

        if (!equalType(input.title, '')) {
            errors.push({
                message: 'Incorrect type!',
                field: 'title' })
        } else if (input.title.length > 40) {
                errors.push({
                    message: 'Too many characters! (maxLength: 40)',
                    field: 'title'
                })
            }
        if (!equalType(input.author, '')) {
            errors.push({
                message: 'Incorrect type!',
                field: 'author' })
        } else if (input.author.length > 20) {
            errors.push({
                message: 'Too many characters! (maxLength: 20)',
                field: 'author'
            })
        }


            if (!arrayStrictMatch(Object.keys(RESOLUTIONS), input.availableResolutions)) {
                errors.push({
                    message: 'At least one resolution should be added!',
                    field: 'availableResolutions'
                })
            }

        if (errors[0]) {
            return { HTTPStatus: 400, Response: { errorsMessages: errors }, Success: false }
        }

        return { HTTPStatus: 201, Response: undefined, Success: true }

    }



    UpdateVideo(input: UpdateVideoInputModel): { HTTPStatus: number, Response: undefined | APIErrorResult, Success: boolean } {

        let errors: FieldError[] = []

        if (!equalType(input.title, '')) {
            errors.push({
                message: 'Incorrect type!',
                field: 'title' })
        } else if (input.title.length > 40) {
            errors.push({
                message: 'Too many characters! (maxLength: 40)',
                field: 'title'
            })
        }
        if (!equalType(input.author, '')) {
            errors.push({
                message: 'Incorrect type!',
                field: 'author' })
        } else if (input.author.length > 20) {
            errors.push({
                message: 'Too many characters! (maxLength: 20)',
                field: 'author'
            })
        }
        if (!equalType(input.publicationDate, '')) {
            errors.push({
                message: 'Incorrect type!',
                field: 'publicationDate' })
        } else {

            const dateIsValid = (new Date(Date.parse(input.publicationDate)).toISOString() ===
                new Date(input.publicationDate).toISOString())

            if (!dateIsValid) {
                errors.push({
                    message: 'Incorrect date-time format!',
                    field: 'publicationDate'
                })
            }
        }
        if (!equalType(input.minAgeRestriction, 0) && !equalType(input.minAgeRestriction, null)) {
            errors.push({
                message: 'Incorrect type!',
                field: 'minAgeRestriction' })
        } else if (input.minAgeRestriction !== null) {
            if (input.minAgeRestriction > 18 || input.minAgeRestriction < 1) {
                errors.push({
                    message: 'minAgeRestriction should be null or (1 - 18)!',
                    field: 'minAgeRestriction'
                })
            }
        }
        if (!equalType(input.canBeDownloaded, false)) {
            errors.push({
                message: 'Incorrect type!',
                field: 'canBeDownloaded'
            })
        }

            if (!arrayStrictMatch(Object.keys(RESOLUTIONS), input.availableResolutions)) {
                errors.push({
                    message: 'At least one resolution should be added!',
                    field: 'availableResolutions'
                })
            }

        if (errors[0]) {
            return { HTTPStatus: 400, Response: { errorsMessages: errors }, Success: false }
        }

        return { HTTPStatus: 204, Response: undefined, Success: true }

    }



 */


/**Return true if the second array contains at least 1 value
 * and all values from the second array exactly match the first array.
 */
const arrayStrictMatch = (first: string[], second: string[] | null): boolean => {
    if (second === null) {
        return false
    }
    if (second.length < 1) {
        return false
    }
    for (let i = 0; i < second.length; i++) {
        if (first.indexOf(second[i]) === -1) {
            return false
        }
    }
    return true
}



const equalType = (a: unknown, b: unknown) => typeof(a) === typeof(b)