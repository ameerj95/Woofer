const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    Name : String,
    email : String,
    posts : [{type: Schema.Types.ObjectId, ref: 'Post'}],
    isConnected : Boolean,
    bio : String
})


const User = mongoose.model("User", UserSchema)
module.exports = User

