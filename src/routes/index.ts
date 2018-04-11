import * as cors from 'cors'
import { Router, Request, Response } from 'express'
import * as passport from 'passport'
const router: Router = Router()

/* GET home page. */
router.post('/login', cors(), login)

router.options('/login', cors())
// router.use('/login', express.json())


function login(req: Request, res: Response, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

    passport.authenticate('local', function(err, user) {
        if (err) { return next(err) }
        if (!user) { return res.send('User not found'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send(user);
        });
    })(req, res, next);
}

export const Routes: Router = router
