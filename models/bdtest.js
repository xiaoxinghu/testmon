var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Test = require('./test');

var BDTestSchema = new Schema({
  suite: { type: String, default: 'uncategorized' },
  steps: [{
    title: String,
    start: { type: Date, default: Date.now },
    stop: { type: Date, default: Date.now },
    status: String
  }]
}, {
  discriminatorKey: 'kind'
});

module.exports = Test.discriminator('BDTest', BDTestSchema);
