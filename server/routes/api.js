const express = require('express')
const router = express.Router()
const { model } = require('mongoose')
const moment = require('moment')
const Post = require('../../model/Post')
const User = require('../../model/User')
const Comment = require('../../model/Comment')
const Hashtag = require('../../model/Hashtag')

//Get all the posts***checked
router.get('/posts', function (req, res) {
    Post.find({}).populate("comments").sort({ date: -1 }).exec(function (err, posts) {
        res.send(posts)
    })
})

//Get all the users***checked
router.get('/users', function (req, res) {
    User.find({}).populate("posts").exec(function (err, posts) {
        res.send(posts)
    })
})

//get route /getFriends , returns populated friends of current user 
router.get('/getFriends', function (req, res) {
    User.findById(req.session.userId).populate("friends").exec(function (err, friends) {
        res.send(friends)
    })
})

//Get One user***check
router.get('/user/:name', function (req, res) {
    let name = req.params.name
    User.findOne({ name: name })
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

//Get hashtag
router.get('/getHashed/:hashtext', function (req, res) {
    var hashtext = req.params.hashtext
    Hashtag.findOne({ word: hashtext }).populate({
        path: 'posts',
        populate: {
            path: 'comments'
        }
    }).sort({ date: -1 }).exec(function (err, posts) {
        console.log(posts)
        res.send(posts)
    })
})

//a put that recives in body new data about user info and update them
router.put('/user', function (req, res) {
    var { name, email, bio } = req.body
    User.findByIdAndUpdate(req.session.userId,
        { "$set": { "name": name, "email": email, "bio": bio } })
        .exec(function (err, result) {
            console.log(result)
            res.send(result)
        })
})

//Add new user***checked
router.post('/user', function (req, res) {
    let user = req.body
    let newUser = new User({
        name: user.name,
        email: user.email,
        password: user.password,
        friends: [],
        posts: [],
        isConnected: user.isConnected,
        bio: user.bio
    })
    newUser.friends.push(new User({
        name: "ann"
    }))
    newUser.save()
    res.send(newUser)
})

//Add new post ***checked
router.post('/posts', function (req, res) {
    let post = req.body
    let newPost = new Post({
        user: post.user,
        text: post.text,
        likes: [],
        comments: [],
        date: moment().format("LLL")
    })
    User.findByIdAndUpdate(req.session.userId,
        { $push: { posts: newPost } }, { new: true }, function (err, userres) {
            res.send(userres)
        })
    let hashTagArray = getHashies(newPost.text)
    hashTagArray.forEach(element => SaveHashtag(element.replace("#", ""),newPost._id));
    newPost.save()

})

//Adds new comment ***checked
router.post('/comment', function (req, res) {
    let comment = req.body
    let newComment = new Comment({
        user: comment.user,
        text: comment.text,
        date: moment().format("LLL")
    })

    Post.findByIdAndUpdate(comment.postId,
        { $push: { comments: newComment } }, { new: true }, function (err, postres) {
            res.send(newComment)
        })
    newComment.save()
})

//Add to/hashtag


//Deletes a post ***checked
router.delete('/posts', function (req, res) {
    let { postId } = req.body
    Post.findByIdAndDelete(postId, function (err, postdelete) {
        res.send('ok')
    })
})

//Deletes a comment***checked
router.delete('/comment', function (req, res) {
    let { commentId } = req.body
    Comment.findByIdAndDelete(commentId, function (err, rese) {
        res.send("ok")
    })
})

//Login *** checked
router.post('/login', function (req, res) {
    let { email, password } = req.body
    User.findOne({
        $and: [
            { email: email },
            { password: password }
        ]
    }).exec(function (err, result) {
        if (result == null) {
            req.session.connected = false
            res.send(false)
        }
        else {
            req.session.connected = true
            req.session.userId = result._id
            res.send(result)
        }
    })
})

//Sessoin *** checked
router.get('/session', function (req, res) {
    res.send(req.session.userId)
})

//logout 
router.get('/logout', function (req, res) {
    req.session.destroy()
    res.send('This session is destroyed')
})

const getHashies = function (str) {
    var hashTagArray = str.split(" ").filter(function (n) {
        if (/#/.test(n)) return n;
    });
    return hashTagArray
}

const SaveHashtag = async function (htWord, htPostId) {
    
    await Hashtag.findOne({ word: htWord }, function (err, result) {
        if (result == null) {
            let newHashtag = new Hashtag({
                word: htWord,
                posts:[{_id : htPostId}]
            })
            newHashtag.save()
            console.log(newHashtag)
        }
        else{
            Hashtag.findOneAndUpdate({ word: htWord },
                { $push: { posts: htPostId } }, { new: true }, function (err, result) {
                })
        }
    })
    




}


module.exports = router