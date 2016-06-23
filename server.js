var express = require('express')
var http = require('http')
var debug = require('debug')('server')
var path = require('path')
var bodyParser = require('body-parser')
var favicon = require('serve-favicon')
var utils = require('./utils')

// var logger = require('morgan')
// var cookieParser = require('cookie-parser')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(utils.validator)
// app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use(require('./routes'))

// server
var server = http.createServer(app)
// server.on('error', onError)
server.on('listening', () => {
  var addr = server.address()
  var bind = typeof addr === 'string'
  ? 'pipe ' + addr
  : 'port ' + addr.port
  debug('Listening on ' + bind)
})

server.on('close', () => {
  debug('Server closed')
})

var serve = () => {
  return _.db.connect()
  .then(() => {
    server.listen(_.config.port)
  })
}

var shutdown = () => {
  return server.close()
}

module.exports = server
