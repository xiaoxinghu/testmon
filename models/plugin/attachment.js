module.exports = exports = function attachmentPlugin(schema, options) {
  schema.add({ attachments: [ {
    filename: String,
    timestamp: { type: Date, default: Date.now },
    tags: [ String ]
  } ] });
};
