import * as mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/groceriesList')

export { mongoose }
