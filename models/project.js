var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  _id: { type: String, lowercase: true, trim: true },
  runs: [{ type: Schema.Types.ObjectId, ref: 'Run' }],
  meta: {}
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);
