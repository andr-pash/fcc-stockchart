const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
require('dotenv').config()


const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dbURL = process.env.MONGODB_URI


// set up db connection
mongoose.connect(dbURL)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => server.listen(process.env.PORT || 3000))


// init app and pass middleware
app.use(bodyParser())


// Routing config
app.use( express.static('./app/public'))
app.use('/public/images' , express.static('./app/public/images'))
require(__dirname + '/app/routes')(app)


// socket io logic
require(__dirname + '/app/socket')(io)
