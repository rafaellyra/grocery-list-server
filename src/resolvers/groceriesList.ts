let mongoose = require('mongoose')
let autoIncrement = require('mongoose-auto-increment')

let connection = mongoose.createConnection('mongodb://localhost:27017/groceriesList')
autoIncrement.initialize(connection)

let listSchema = new mongoose.Schema({
    archived: { type: Boolean, required: false },
    createdAt: { type: Date, required: true },
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
    Date: {
        __parseValue(value) {
            return new Date(value); // value from the client
        },
        __serialize(value) {
            return value.getTime(); // value sent to the client
        },
        __parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        }
    },
    Query: {
        archivedLists: (): List[] => {
            return new Promise((resolve) => {
                GroceriesList.find({ 'archived': true }, (err, lists) => {
                    if (err) reject(err)
                    else resolve(lists)
                })
            })
        },
        groceriesLists: (): List[] => {
            return new Promise((resolve) => {
                GroceriesList.find({ 'archived': false }, (err, lists) => {
                    if (err) reject(err)
                    else resolve(lists)
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
                    else {
                        resolve(list)
                    }
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
        archiveList: (_, { id }): List => {
            return new Promise((resolve) => {
                GroceriesList.findByIdAndUpdate(id, { 'archived': true }, { new: true }, (err, list) => {
                    if(err) reject(err)
                    else resolve(list)
                })
            })
        },
        createList: (_, { name }): List => {
            return new Promise((resolve) => {
                const dateNow = (new Date()).toLocaleDateString()
                new GroceriesList({
                    archived: false,
                    createdAt: dateNow,
                    name: name
                }).save((err, list) => {
                    if (err) reject(err)
                    else resolve(list)
                })
            })
        },
        toggleListItem: (_, { id, checked }): Item => {
            return new Promise((resolve) => {
                ListItem.findByIdAndUpdate(id, { 'checked': checked }, { new: true }, (err, item) => {
                    if(err) reject(err)
                    else resolve(item)
                })
            })
        }
    }
}
