var app = require('..'),
    mongoose = require('mongoose'),
    mockgoose = require('mockgoose'),
    debug = require('debug')('test'),
    utils = require('../utils'),
    db = utils.db,
    config = utils.config,
    seed = require('./seed')

before(() => {
  utils.config.db.name += '-test'
  utils.db.connect = () => {
    var db = config.db
    return mockgoose(mongoose).then(() => {
      return mongoose.connect(db.uri + db.name)
    })
  }
  return app.serve()
    .then(seed)
})

after(() => {
  return app.shutdown()
})
