import * as cors from 'cors'
import { NextFunction, Router, Request, Response } from 'express'
import { auth } from '../config/database'
const router: Router = Router()

/* GET home page. */
router.all('/login', cors(), login)
function login(req: Request, res: Response, next: NextFunction) {
    // TODO:   Guard against CSRF attacks
    let body = ''
    req.on('data', (chunk) => {
        body += chunk.toString()
    })

    req.on('end', () => {
        // Set session expiration to 5 days.
        const expiresIn = 60 * 60 * 24 * 5 * 1000

        console.log('token', body)
        auth.createSessionCookie(body, { expiresIn }).then((sessionToken: string) => {
            res.json({ sessionToken: sessionToken })
        }).catch((error) => {
            console.log('catch', error)
        })
    })
}

export const LoginRoutes: Router = router
