var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Test = require('./test')

var Case = new Schema({
  steps: [{
    name: String,
    start: { type: Date, default: Date.now },
    stop: { type: Date, default: Date.now },
    status: String
  }],
  error: {
    message: String,
    stacktrace: String
  }
}, {
  discriminatorKey: 'kind'
})

module.exports = Test.discriminator('Case', Case)
