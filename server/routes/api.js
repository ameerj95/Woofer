const express = require('express')
const router = express.Router()
const { model } = require('mongoose')
const Post = require('../../model/Post')
const User = require('../../model/User')
const Comment = require('../../model/Comment')

//Get all the posts***checked
router.get('/posts', function (req, res) {
    Post.find({},function(err,  posts){
        console.log(posts)
        res.send(posts)
    })
})

//Get all the users***checked
router.get('/users', function (req, res) {
    User.find({}).populate("posts").exec(function(err,  posts){
        console.log(posts)
        res.send(posts)
    })
})

//Get One user***check
router.get('/user/:name', function (req, res) {
    let name = req.params.name
    User.findOne({name: name})
    .populate({
        path: 'posts',
        populate: {
            path: 'comments'
        }
    })
    .exec(function (err, result) {
        console.log(result.posts)
        res.send(result.posts)
    })
})

//Add new user***checked
router.post('/user', function (req, res){
    let user = req.body
    let newUser = new User({
        name : user.name,
        email : user.email,
        posts : [],
        isConnected : user.isConnected,
        bio : user.bio
    })
    newUser.save()
    res.send()
})

//Add new post ***checked
router.post('/posts', function (req, res) {
    let post  = req.body
    let newPost = new Post({
        user : post.user,
        text : post.text,
        likes : [],
        comments :[],
        date : post.date   
    })
    console.log(newPost)
    User.findByIdAndUpdate(post.userId,
        {$push : {posts : newPost } }, { new: true }, function (err, userres) 
        { 
            res.send(userres)
    })
    newPost.save()
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



//Adds new comment ***checked
router.post('/comment', function (req, res) {
    let comment  = req.body
    let newComment = new Comment({
        user : comment.user,
        text : comment.text,
        date : comment.date   
    })

    Post.findByIdAndUpdate(comment.postId,
        {$push : {comments : newComment } }, { new: true }, function (err, postres) 
        { 
            res.send(postres)
    })

    newComment.save()
})

//Deletes a post ***checked
router.delete('/posts', function (req, res){
    let {postId}  = req.body
    Post.findByIdAndDelete(postId,function(err,res){
        res.send()
    })
})

//Deletes a comment***checked
router.delete('/comment', function (req, res){
    let {commentId}  = req.body
    Comment.findByIdAndDelete(commentId,function(err,res){
        res.send()
    })

})



module.exports = router