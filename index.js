var utils = require('./utils')
, server = require('./server')
, importer = require('./importer')

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

app.config = utils.config
app.import = importer.import
app.taste = utils.eater.taste
app.eat = utils.eater.eat
