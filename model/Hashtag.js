const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HashtagSchema = new Schema({
    word : String,
    posts : [{type: Schema.Types.ObjectId, ref: 'Post'}]
})

const Hashtag = mongoose.model("Hashtag", HashtagSchema)
module.exports = Hashtag

