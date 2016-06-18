var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    plugin = require('./plugin');

var transform = (doc, ret, options) => {
  delete ret.__v;
  delete ret.createdAt;
  delete ret.updatedAt;
};

var Test = new Schema({
  title: String,
  error: {},
  meta: {},
  tags: [String],

  run: { type: String, ref: 'Run' }
}, {
  timestamps: true,
  discriminatorKey: 'kind',
  toJSON: {
    transform
  }
});

Test.plugin(plugin.status);
Test.plugin(plugin.attachment);

module.exports = mongoose.model('Test', Test);
