const express = require('express')
const router = express.Router()
const { model } = require('mongoose')
const Post = require('../../model/Post')
const User = require('../../model/User')

router.get('/posts', function (req, res) {
    Post.find({},function(err,  posts){
        console.log(posts)
        res.send(posts)
    })
})
router.post('/posts', function (req, res) {
    let post  = req.body
    let newPost = new Post({
        user : post.user,
        text : post.text,
        likes : [],
        date : post.date   
    })
    newPost.save()
    res.send()
})


module.exports = router