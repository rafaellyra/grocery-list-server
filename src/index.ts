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

// App imports
import {LoginRoutes, RegisterRoutes,} from './routes'

// Authentication impots
import * as passport from 'passport'
import Account from './models/account'
import {Register} from "ts-node";

const app = express()

// GraphQL Schema Setup
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types'), { recursive: true }))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers'), { recursive: true }))
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// Authentication Setup
const LocalStrategy = require('passport-local').Strategy

app.use(cookieParser());
app.use(require('express-session')({
    secret: 'token',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.options('*', cors())
app.use(express.json())
app.use(LoginRoutes)
app.use(RegisterRoutes)

// Passport config
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// App initialization
app.use('/graphql', bodyParser.json(), cors(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(9001, () => {
    console.log('GraphQL server is running on http://localhost:9001/graphql')
    console.log('To explore your schema, visit http://localhost:9001/graphiql')
});
