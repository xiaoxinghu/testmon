var Factory = require('rosie').Factory,
    faker = require('faker');

var names = ['debug', 'regression', 'nightly'];
var status = ['passed', 'failed', 'broken', 'pending'];

var basic = new Factory()
      .attr('name', () => `${faker.hacker.noun()} ${faker.hacker.verb()} ${faker.hacker.noun()}`)
      .attr('status', () => faker.random.arrayElement(status))
      .attr('start', () => faker.date.recent())
      .attr('stop', ['start'], start => {
        let d = new Date(start);
        d.setHours(d.getHours() + 1);
        return d;
      });

module.exports = {
  basic
};
