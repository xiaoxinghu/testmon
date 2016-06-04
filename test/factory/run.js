var Factory = require('rosie').Factory,
    test = require('./test'),
    faker = require('faker');

var names = ['debug', 'regression', 'nightly'];

var basic = new Factory()
      .attr('name', () => faker.random.arrayElement(names))
      .attr('start', () => faker.date.recent())
      .attr('stop', ['start'], start => {
        let d = new Date(start);
        d.setHours(d.getHours() + 1);
        return d;
      })
      .attr('tests', () => {
        return test.basic.buildList(faker.random.number(3));
      });

module.exports = {
  basic
};
