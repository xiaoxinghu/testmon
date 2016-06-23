var Factory = require('rosie').Factory,
    faker = require('faker')

var names = ['debug', 'regression', 'nightly']
var status = ['passed', 'failed', 'broken', 'pending']
var tags = ['iPhone 6', 'iPad Pro', 'iPad Air', 'iPhone 6+']

var basic = new Factory()
      .attr('name', () => faker.fake('{{hacker.noun}}, {{hacker.verb}} {{hacker.noun}}'))
      .attr('status', () => faker.random.arrayElement(status))
      .attr('tags', () => [ faker.random.arrayElement(tags) ])
      .attr('start', () => faker.date.recent())
      .attr('stop', ['start'], start => {
        let d = new Date(start)
        d.setHours(d.getHours() + 1)
        return d
      })

module.exports = {
  basic
}
