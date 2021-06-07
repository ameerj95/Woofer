const express = require('express')
const router = express.Router()
const { model } = require('mongoose')
const Post = require('../../model/Post')
const User = require('../../model/User')
const Comment = require('../../model/Comment')
const Hashtag = require('../../model/Hashtag')



//Get all the posts***checked
router.get('/posts', function (req, res) {
    Post.find({}).populate("comments").exec(function (err, posts) {
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
        res.send(result)
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
    res.send(newUser)
})

//Add new post ***checked
router.post('/posts', function (req, res) {
    let post  = req.body
    let newPost =new Post ({
        user : post.user,
        text : post.text,
        likes : [],
        comments :[],
        date : post.date   
    })
    console.log(newPost)
    User.findByIdAndUpdate(req.session.userId,
        {$push : {posts : newPost } }, { new: true }, function (err, userres) 
        { 
            res.send(userres)
    })
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
            res.send(newComment)
    })
    newComment.save()
})

//Add to/hashtag
router.post('/hashtag', async function(req,res){
    let {htWord , htPostId} = req.body
    console.log(htWord)
    console.log(htPostId)
    await Hashtag.findOne({word : htWord}, function(err,result) {
        if(result == null){
            let newHashtag = new Hashtag({
                word : htWord,
            })
            newHashtag.save()
        }
    })
    await Hashtag.findOneAndUpdate({word : htWord},
        {$push : {posts : htPostId}}, { new: true }, function (err, result) {
            res.send(result)
    })
})

//Deletes a post ***checked
router.delete('/posts', function (req, res){
    let {postId}  = req.body
    Post.findByIdAndDelete(postId, function (err, postdelete){
        res.send('ok')
    })
})

//Deletes a comment***checked
router.delete('/comment', function (req, res){
    let {commentId}  = req.body
    Comment.findByIdAndDelete(commentId,function(err,rese){
        res.send()
    })
})

//Login *** checked
router.post('/login', function (req, res){
    let { email , password}  = req.body
    User.findOne({$and : [
         {email : email},
         {password : password}
        ]}).exec(function(err,result){
            console.log(result)
            if(result == null){
                req.session.connected = false
                res.send(404)
            }
            else{
                req.session.connected = true
                req.session.userId = result._id
                res.send(result)
            }
     })
})

//Sessoin *** checked
router.get('/session',function(req,res){
    res.send(req.session.userId)
})

//logout 
router.post('/logout', function (req, res){
    req.session.destroy()
    res.send('This session is destroyed')
})

module.exports = router