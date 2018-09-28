import * as cors from 'cors'
import { NextFunction, Router, Request, Response } from 'express'
import { auth } from '../config/database'
const router: Router = Router()

router.all('/login', cors({
    credentials: true,
    origin: (origin, callback) => {
        console.log(origin)
        callback(null, true)
    },
    optionsSuccessStatus: 200
}), login)
function login(req: Request, res: Response, next: NextFunction) {
    // TODO:   Guard against CSRF attacks
    let body = ''
    req.on('data', (chunk) => {
        body += chunk.toString()
    })

    req.on('end', () => {
        // Set session expiration to 5 days.
        const expiresIn = 60 * 60 * 24 * 5 * 1000

        auth.createSessionCookie(body, { expiresIn }).then((sessionCookie: string) => {
            const options = {
                maxAge: expiresIn,
                httpOnly: true
            }
            res.cookie('SESSION', sessionCookie, options)
            // res.end(JSON.stringify({ status: 'success'}))
            res.json({ status: 'success' })
        }).catch((error) => {
            console.warn('catch', error)
        })
    })
}

export const LoginRoutes: Router = router
