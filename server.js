const express = require('express')
const path = require('path')
const api = require('./server/routes/api')
var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/Woofer")
const session = require('express-session')

var app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(session({
  secret: "somesecretkey",
  resave: false, // Force save of session for each request
  saveUninitialized: false, // Save a session that is new, but has not been modified
  cookie: {maxAge: 1800000}
}))

app.use('/',api)

app.listen(3001, function() {
    console.log("Server up and running on port 3001")
  })
  