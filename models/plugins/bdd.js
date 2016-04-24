module.exports = exports = function bddPlugin(schema, options) {
  schema.add({ steps: [ {
    title: String,
    start: { type: Date, default: Date.now },
    stop: { type: Date, default: Date.now },
    status: String
  } ] });
};
