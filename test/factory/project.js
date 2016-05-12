var Factory = require('rosie').Factory,
    exports = module.exports = {},
    run = require('./run'),
    faker = require('faker');

exports.basic = new Factory()
  .sequence('_id', (i) => `${faker.hacker.noun()}_${i}`)
  .attr('meta', {stream: faker.company.companyName()});

exports.withoutRun = new Factory()
  .extend(exports.basic);

exports.withRuns = new Factory()
  .extend(exports.basic)
  .attr('runs', ['_id'], _id => {
    return run.basic.buildList(4, { project: _id });
  });
