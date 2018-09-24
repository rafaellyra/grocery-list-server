import { auth, databaseRef } from '../config/database'
import { List } from '../../../groceries-list/src/app/store'

let listsDatabaseRef = databaseRef.child('lists')
let userId: string

const idToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3ZTBmNDI1NjRlYjc0Y2FlNGZkNDhiZGE5ZjA0YmE2OTRmNDExNDQifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ3JvY2VyaWVzLWFwcC1jODJiMiIsIm5hbWUiOiJSYWZhZWwgTHlyYSIsInBpY3R1cmUiOiJodHRwczovL2xoNi5nb29nbGV1c2VyY29udGVudC5jb20vLXd6RloyeFhGdElZL0FBQUFBQUFBQUFJL0FBQUFBQUFBQkpVL2g0RGl1MlhscUtvL3Bob3RvLmpwZyIsImF1ZCI6Imdyb2Nlcmllcy1hcHAtYzgyYjIiLCJhdXRoX3RpbWUiOjE1Mzc0NTU3MzgsInVzZXJfaWQiOiJaMVdINzZ3dGtaTk5RTVJSNTFtQmdSSnBVYjYzIiwic3ViIjoiWjFXSDc2d3RrWk5OUU1SUjUxbUJnUkpwVWI2MyIsImlhdCI6MTUzNzQ4MzY3OCwiZXhwIjoxNTM3NDg3Mjc4LCJlbWFpbCI6InJhZmFlbEByYWZhZWxseXJhLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA5NjY0MzY1MzYzODIyMzcxNzAxIl0sImVtYWlsIjpbInJhZmFlbEByYWZhZWxseXJhLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.hglK0LztScpNvmuUT54Qz68Uul15Pm9C9UxxCMPia7-mEyFrGXcWOezn2uT8p5knIqI0Eyf3cqNQfCDXQHkP42HzQFCpi5eETn_Sw_bNQxSsmdnTpNDFVhoGaMbiBOY4v4Tf3oxKcmtTTGSZK78wO1_emh6clXwnxhFfIVGd4M6UATHZcCbPvzDzCi-GtW0ILGP4JP_myGInmm1A5Z23ajRVuFWOfQX0iO1ZQuSXETZHZSTIj6IAV7SC0KSsGDpyQFRVAliC_U3cpLB_luK6pIMS9nRmON9nH_8TxowapT2-s0feMeIYFwTEUd2lx7y4H89hEvwKCmudtnoELFUQZQ'

function verifyToken(token: string) {
    auth.verifyIdToken(idToken)
        .then(function(decodedToken) {
            userId = decodedToken.uid
            // ...
        }).catch(function(error) {
        console.log(error)
        // Handle error
    })
}
// let connection = mongoose.createConnection('mongodb://localhost:27017/groceriesList')
// autoIncrement.initialize(connection)
//
// let listSchema = new mongoose.Schema({
//     archived: { type: Boolean, required: false },
//     createdAt: { type: Date, required: true },
//     name: { type: String, required: true }
// });
// listSchema.plugin(autoIncrement.plugin, 'List');
//
// let listItemSchema = new mongoose.Schema({
//     checked: { type: Boolean, required: true },
//     listId: { type: Number, required: true },
//     name: { type: String, required: true }
// })
// listItemSchema.plugin(autoIncrement.plugin, 'Item');
//
// const GroceriesList = connection.model('lists', listSchema)
// const ListItem = connection.model('items', listItemSchema)
//
//
export default {
    Date: {
        __parseValue(value) {
            return new Date(value); // value from the client
        },
        __serialize(value) {
            console.log('value', value)
            return value; // value sent to the client
        },
        __parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        }
    },
    Query: {
        // archivedLists: (): List[] => {
        //     return new Promise((resolve) => {
        //         GroceriesList.find({ 'archived': true }, (err, lists) => {
        //             if (err) reject(err)
        //             else resolve(lists)
        //         })
        //     })
        // },
        // groceriesLists: (): List[] => {
        //     return new Promise((resolve) => {
        //         GroceriesList.find({ 'archived': false }, (err, lists) => {
        //             if (err) reject(err)
        //             else resolve(lists)
        //         })
        //     })
        // },
        // groceriesListItems: (obj, args): ListItem[] => {
        //     return new Promise((resolve) => {
        //         ListItem.find((err, list) => {
        //             if (err) reject(err)
        //             else resolve(list)
        //         })
        //     })
        // },
        // groceriesList: (obj, args): List => {
        //     return new Promise((resolve) => {
        //         GroceriesList.findById(args.id, (err, list) => {
        //             if (err) reject(err)
        //             else {
        //                 resolve(list)
        //             }
        //         })
        //     })
        // }
    },
    List: {
        // items: (list): ListItem[] => {
        //     return new Promise((resolve) => {
        //         ListItem.find({ 'listId': list._id}, (err, list) => {
        //             if (err) reject(err)
        //             else resolve(list)
        //         })
        //     })
        // }
    },
    Mutation: {
        // addItemToList: (_, { listId, name }): Item => {
        //     return new Promise((resolve) => {
        //         new ListItem({
        //             checked: false,
        //             name: name,
        //             listId: listId
        //         }).save((err, list) => {
        //             if (err) reject(err)
        //             else resolve(list)
        //         })
        //     })
        // },
        // archiveList: (_, { id }): List => {
        //     return new Promise((resolve) => {
        //         GroceriesList.findByIdAndUpdate(id, { 'archived': true }, { new: true }, (err, list) => {
        //             if(err) reject(err)
        //             else resolve(list)
        //         })
        //     })
        // },
        createList: (_, { name  }): List => {
            console.log(_)
            return new Promise((resolve) => {
                const dateNow = new Date().toLocaleDateString()
                let userRef = listsDatabaseRef.child(userId)
                let newList = userRef.push()

                userRef.limitToLast(1).on('child_added', (snapshot) => {
                    let update = snapshot.val()
                    resolve({
                        archived: update.archived,
                        dateCreated: update.dateCreated,
                        id: newList.key,
                        name: update.name
                    })
                })

                newList.set({
                    archived: false,
                    dateCreated: dateNow,
                    name: name
                })
            })
        },
        // toggleListItem: (_, { id, checked }): Item => {
        //     return new Promise((resolve) => {
        //         ListItem.findByIdAndUpdate(id, { 'checked': checked }, { new: true }, (err, item) => {
        //             if(err) reject(err)
        //             else resolve(item)
        //         })
        //     })
        // }
    }
}
