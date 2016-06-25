var app = require('..')
, mongoose = require('mongoose')
, mockgoose = require('mockgoose')
, debug = require('debug')('test')
, utils = require.main.require('utils')
, seed = require('./seed')

before(() => {
  utils.config.db.name += '-test'
  utils.db.connect = () => {
    var db = utils.config.db
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
