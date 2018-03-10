let mongoose = require('mongoose')
let autoIncrement = require('mongoose-auto-increment')

let connection = mongoose.createConnection('mongodb://localhost:27017/groceriesList')
autoIncrement.initialize(connection)

let listSchema = new mongoose.Schema({
    name: { type: String, required: true }
});
listSchema.plugin(autoIncrement.plugin, 'List');

let listItemSchema = new mongoose.Schema({
    checked: { type: Boolean, required: true },
    listId: { type: Number, required: true },
    name: { type: String, required: true }
})
listItemSchema.plugin(autoIncrement.plugin, 'Item');

const GroceriesList = connection.model('lists', listSchema)
const ListItem = connection.model('items', listItemSchema)


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
        groceriesListItems: (obj, args): ListItem[] => {
            return new Promise((resolve) => {
                ListItem.find((err, list) => {
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
    List: {
        items: (list): ListItem[] => {
            return new Promise((resolve) => {
                ListItem.find({ 'listId': list._id}, (err, list) => {
                    if (err) reject(err)
                    else resolve(list)
                })
            })
        }
    },
    Mutation: {
        addItemToList: (_, { listId, name }): Item => {
            return new Promise((resolve) => {
                new ListItem({
                    checked: false,
                    name: name,
                    listId: listId
                }).save((err, list) => {
                    if (err) reject(err)
                    else resolve(list)
                })
            })
        },
        createList: (_, { name }): List => {
            return new Promise((resolve) => {
                new GroceriesList({
                    name: name
                }).save((err, list) => {
                    if (err) reject(err)
                    else resolve(list)
                })
            })
        }
    }
}
