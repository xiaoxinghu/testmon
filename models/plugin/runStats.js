module.exports = exports = (schema, options) => {
  schema.add({
    stats: {
      suites: { type: Number, default: 0 },
      tests: { type: Number, default: 0 },
      passes: { type: Number, default: 0 },
      failures: { type: Number, default: 0 },
      breaks: { type: Number, default: 0 },
      pendings: { type: Number, default: 0 }
    }
  });
};
