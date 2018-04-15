import * as cors from 'cors'
import { Router, Request, Response } from 'express'
import * as passport from 'passport'
import Account from '../models/account'
const router: Router = Router()

router.post('/register', cors(), register)

function register(req: Request, res: Response, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.status(500).send(err)
        }

        passport.authenticate('local', function(err, user) {
            if (err) { return next(err) }
            if (!user) { return res.send('User not found'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send(user);
            });
        })(req, res, next);
    });
}

export const RegisterRoutes: Router = router
