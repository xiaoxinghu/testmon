var Factory = require('rosie').Factory,
    run = require('./run'),
    faker = require('faker');

var basic = new Factory()
      .sequence('_id', (i) => `${faker.hacker.noun()}_${i}`)
      .attr('meta', {stream: faker.company.companyName()})
      .attr('runs', ['_id'], _id => {
        return run.basic.buildList(5, { project: _id });
      });

module.exports = {
  basic
};
