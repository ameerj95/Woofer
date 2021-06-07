const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name : String,
    email : String,
    password : String,
    friends : [{type: Schema.Types.ObjectId, ref: 'User'}],
    posts : [{type: Schema.Types.ObjectId, ref: 'Post'}],
    isConnected : Boolean,
    bio : String
})


const User = mongoose.model("User", UserSchema)
module.exports = User

