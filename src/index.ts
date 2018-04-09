// Express imports
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'

// GraphQL imports
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import { makeExecutableSchema } from 'graphql-tools'
import * as path from 'path'

// Authentication impots
import * as passport from 'passport'
import * as mongoose from 'mongoose'

const app = express();

// GraphQL Schema Setup
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types'), { recursive: true }))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers'), { recursive: true }))
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// Authentication Setup
const LocalStrategy = require('passport-local').Strategy;
const Account = require('./models/account')
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'token',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Passport config
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost:27017/groceriesList');

// App initialization
app.use('/graphql', bodyParser.json(), cors(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.options('/login', cors())
app.use('/login', express.json())
app.post('/login', cors(), function(req, res, next) {
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
})

app.options('/register', cors())
app.use('/register', express.json())
app.post('/register', cors(), function(req, res, next) {
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
});

app.listen(9001, () => {
    console.log('GraphQL server is running on http://localhost:9001/graphql')
    console.log('To explore your schema, visit http://localhost:9001/graphiql')
});
