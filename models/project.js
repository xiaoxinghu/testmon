var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transform = (doc, ret, options) => {
  delete ret.__v;
  delete ret.createdAt;
  delete ret.updatedAt;
};

var ProjectSchema = new Schema({
  _id: { type: String, lowercase: true, trim: true },
  meta: {}
}, {
  timestamps: true,
  toJSON: {
    transform
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
