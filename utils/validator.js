var validator = require('express-validator'),
    R = require('ramda');

module.exports = validator({
  customValidators: {
    idAvailable: (id, model) => {
      return new Promise((resolve, reject) => {
        return model.count({ _id: id.toLowerCase() }).then(count => {
          if (count == 0) resolve();
          return reject(count);
        });
      });
    },
    idExists: (id, model) => {
      return new Promise((resolve, reject) => {
        return model.findById(id.toLowerCase()).then(found => {
          if (found) return resolve();
          return reject();
        });
      });
    },
    exists: value => {
      return value !== undefined;
    }
  },
  customSanitizers: {
    toLowerCase: value => {
      return R.toLower(value);
    }
  }
});
