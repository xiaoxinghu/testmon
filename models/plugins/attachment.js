module.exports = exports = function attachmentPlugin(schema, options) {
  schema.add({ attachments: [ {
    fileName: String,
    time: { type: Date, default: Date.now },
    tags: [ String ]
  } ] });
};
