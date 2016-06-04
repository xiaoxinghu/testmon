module.exports = exports = (schema, options) => {
  schema.add({
    status: { type: String, default: 'unknown' },
    start: { type: Date, default: Date.now },
    stop: { type: Date, default: Date.now }
  });
};
