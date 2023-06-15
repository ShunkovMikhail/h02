import express, { Request, Response } from 'express'
import basicAuth from 'express-basic-auth'
import { admins } from "./data"
import { DB } from './data'
import { blogsRouter } from "./routes/blogsRouter"
import { postsRouter } from "./routes/postsRouter"

export const app = express()

const db: DB = new DB()

app.use(express.json())

/*
basicAuth({users: admins})
 */

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(204)
})

app.delete('/testing/all-data', (req: Request, res: Response) => {
    res.sendStatus(db.clear())
})

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)


