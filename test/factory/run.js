var Factory = require('rosie').Factory,
    test = require('./test'),
    faker = require('faker')

var names = ['debug', 'regression', 'nightly', 'defect']
var projects = ['batman', 'superman', 'joker']
var tags = ['iPhone', 'iPad', 'Android', 'Android Tablet']

var basic = new Factory()
      .attr('name', () => faker.random.arrayElement(names))
      .attr('start', () => faker.date.recent())
      .attr('stop', ['start'], start => {
        let d = new Date(start)
        d.setHours(d.getHours() + 1)
        return d
      })
      .attr('tags', () => [ faker.random.arrayElement(tags) ])
      .attr('meta', () => {
        return {
          project: faker.random.arrayElement(projects) } })
      .attr('tests', () => {
        return test.basic.buildList(faker.random.number(10))
      })

module.exports = {
  basic
}
