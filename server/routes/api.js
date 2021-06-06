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
router.get('/init', function (req, res) {
    let p1 = new User({
        name : "alaa",
        email: "alaa@mail.com",
        posts : [],
        isConnected : true,
        bio : "Im here and NOT by choice"
     })
    let post1 = new Post({
        user :"alaa" ,
        likes : ["musa","alaa","amir"],
        text : "First post, hello",
    })
    let post2 = new Post({
        user : "alaa",
        likes : ["musa","alaa"],
        text : "hey there!",
    })
    post1.save()
    post2.save()
    p1.posts.push(post1,post2)
    p1.save()
})




module.exports = router