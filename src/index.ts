// Express
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'

// GraphQL
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import { makeExecutableSchema } from 'graphql-tools'
import * as path from 'path'

// App
import { LoginRoutes, RegisterRoutes } from './routes'

// Authentication imports
// import * as passport from 'passport'
// import Account from './models/account'


const app = express()

// GraphQL Schema Setup
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types'), { recursive: true }))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers'), { recursive: true }))
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// Authentication Setup

// APP INITIALIZATION
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'token',
    resave: false,
    saveUninitialized: false
}))

// AUTH

// CORS / JSON
app.options('*', cors())
app.use(express.json())

// APP ROUTES
app.use(LoginRoutes)
app.use(RegisterRoutes)

// GraphQL Explorer
app.use('/graphql', bodyParser.json(), cors(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(9001, () => {
    console.log('GraphQL server is running on http://localhost:9001/graphql')
    console.log('To explore your schema, visit http://localhost:9001/graphiql')
});
