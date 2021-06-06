const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    user : String,
    likes : [String],
    text : String,
    date : String
})

const Post = mongoose.model("Post", PostSchema)
module.exports = Post