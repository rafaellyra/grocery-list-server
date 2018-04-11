import { mongoose } from "../config/database"
import { Document } from 'mongoose'
import * as passportLocalMongoose from 'passport-local-mongoose'

import { PassportLocalSchema } from 'mongoose'

export interface IAccount extends Document {
    username: string
    password: string
}

let schema = new mongoose.Schema({
    username: String,
    password: String,
});

schema.plugin(passportLocalMongoose)

const Account = mongoose.model<IAccount>('Account', schema)

export default Account
