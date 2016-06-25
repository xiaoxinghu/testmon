var utils = require('./utils')
var server = require('./server')

var app = module.exports = {};

app.serve = () => {
  return utils.db.connect()
  .then(() => {
    server.listen(utils.config.port)
  })
}

app.shutdown = () => {
  return server.close()
}

app.taste = utils.eater.taste
app.eat = utils.eater.eat
