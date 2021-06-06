const express = require('express')
const path = require('path')
const api = require('./server/routes/api')
var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/Woofer")

var app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',api)

app.listen(3001, function() {
    console.log("Server up and running on port 3001")
  })
  
  