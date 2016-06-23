var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Test = require('./test')

var Suite = new Schema({
  tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }]
}, {
  discriminatorKey: 'kind'
})

module.exports = Test.discriminator('Suite', Suite)
