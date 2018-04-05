import * as mongoose from 'mongoose'
import * as passportLocalMongoose from 'passport-local-mongoose';

import { PassportLocalSchema } from 'mongoose'

const Account = new mongoose.Schema({
    username: String,
    password: String,
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
