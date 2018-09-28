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
import { auth } from './config/database'
// import * as passport from 'passport'
// import Account from './models/account'

const app = express()
// APP INITIALIZATION
app.use(cookieParser());

// GraphQL Schema Setup
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types'), { recursive: true }))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers'), { recursive: true }))
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});


// AUTH
function authMiddleware(req, res, next) {
    // auth.verifySessionCookie()

    if (!req.cookies.SESSION) {
        throw new Error('Authentication failed')
    }

    auth.verifySessionCookie(
        req.cookies.SESSION, true).then((decodedClaims) => {
        console.log(decodedClaims)
        next()
    }).catch(() => {
        throw new Error('Session cookie is unavailable or invalid.')
    })
}

// CORS / JSON
app.options('*', cors())
app.use(express.json())

// APP ROUTES
app.use(LoginRoutes)
app.use(RegisterRoutes)


// GraphQL Explorer
app.use('/graphql', bodyParser.json(), cors(), graphqlExpress({ schema }))
app.use('/graphiql', authMiddleware, graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(9001, () => {
    console.log('GraphQL server is running on http://localhost:9001/graphql')
    console.log('To explore your schema, visit http://localhost:9001/graphiql')
});
