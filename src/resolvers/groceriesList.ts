let mongoose = require('mongoose')
let autoIncrement = require('mongoose-auto-increment')

let connection = mongoose.createConnection('mongodb://localhost:27017/groceriesList')
autoIncrement.initialize(connection)

let listSchema = new mongoose.Schema({
    listName: { type: String, required: true}
});

listSchema.plugin(autoIncrement.plugin, 'List');

const GroceriesList = connection.model('lists', listSchema)

export default {
    Query: {
        groceriesLists: (): List[] => {
            return new Promise((resolve) => {
                GroceriesList.find((err, list) => {
                    if (err) reject(err)
                    else resolve(list)
                })
            })
        },
        groceriesList: (obj, args): List => {
            return new Promise((resolve) => {
                GroceriesList.findById(args.id, (err, list) => {
                    if (err) reject(err)
                    else resolve(list)
                })
            })
        }
    },
    Mutation: {
        createList: (_, { listName }): List => {
            return new Promise((resolve) => {
                new GroceriesList({
                    listName: listName
                }).save((err, list) => {
                    if (err) reject(err)
                    else resolve(list)
                })
            })
        }
    }
}
