var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestSchema = new Schema({
  title: String,
  start: { type: Date, default: Date.now },
  stop: { type: Date, default: Date.now },
  status: String,
  error: {},
  meta: {},

  _run: { type: String, ref: 'Run' }
}, {
  timestamps: true
});

TestSchema.plugin(require('./plugins/bdd.js'));

module.exports = mongoose.model('Test', TestSchema);
