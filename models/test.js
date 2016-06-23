var mongoose = require('mongoose'),
Schema = mongoose.Schema,
plugin = require('./plugin')

var transform = (doc, ret, options) => {
  delete ret.__v
  delete ret.createdAt
  delete ret.updatedAt
}

var Test = new Schema({
  name: { type: String, required: true },
  status: { type: String, default: 'unknown' },
  start: Date,
  stop: Date,
  time: Number,
  meta: {},
  tags: { type: [String], default: [] },
}, {
  timestamps: true,
  discriminatorKey: 'kind',
  toJSON: {
    transform
  }
})

Test.plugin(plugin.attachment)

var autoPopulate = function(next) {
  this.populate('tests')
  next()
}

Test.pre('findOne', autoPopulate)

module.exports = mongoose.model('Test', Test)
