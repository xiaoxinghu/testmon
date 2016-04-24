var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RunSchema = new Schema({
  name: String,
  start: { type: Date, default: Date.now },
  stop: { type: Date, default: Date.now },
  status: String,
  meta: {},
  stats: {
    suites: { type: Number, default: 0 },
    tests: { type: Number, default: 0 },
    passes: { type: Number, default: 0 },
    failures: { type: Number, default: 0 },
    breaks: { type: Number, default: 0 },
    pendings: { type: Number, default: 0 }
  },
  tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }],

  _project: { type: String, ref: 'Project' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Run', RunSchema);
