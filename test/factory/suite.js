var Factory = require('rosie').Factory,
    test = require('./test'),
    faker = require('faker')

var names = ['debug', 'regression', 'nightly', 'defect']

var base = new Factory()
      .attr('name', () => faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'))
      .attr('start', () => faker.date.recent())
      .attr('stop', ['start'], start => {
        let d = new Date(start)
        d.setHours(d.getHours() + 1)
        return d
      })

var basic = new Factory()
      .extend(base)
      .option('numTests', 10)
      .attr('tests', ['numTests'], numTests => {
        return test.basic.buildList(numTests)
      })

module.exports = {
  basic
}
