var Factory = require('rosie').Factory,
    exports = module.exports = {},
    faker = require('faker');

var names = ['debug', 'regression', 'nightly'];

exports.basic = new Factory()
  .attr('name', () => faker.random.arrayElement(names));
