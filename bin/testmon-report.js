var rp = require('request-promise')
, chalk = require('chalk')
, moment = require('moment')
, util = require('util')
, program = require('commander')
, config = require.main.require('utils/config')

program
  .option('-q, --query [filter]', 'report filter')
  .parse(process.argv)

const style = {
  passed: chalk.green,
  failed: chalk.red,
  broken: chalk.yellow,
  pending: chalk.gray
}

var api = path => {
  return rp({
    uri: `http://${config.remote}:${config.port}/api/${path}`,
    json: true
  })
}

var runSummary = run => {
  return api(`runs/${run._id}/stats`).then(res => {
    // console.log('  ---------------------------------------')
    console.log(`  ----- ${chalk.gray(run.start)} ${run.name}`)
    console.log.apply(this, Object.keys(res).map(status => style[status](`    ${res[status]}\t${status}`)))
    // for (var status in res) {
    //   console.log(style[status](`    ${res[status]}\t${status}`))
    // }
  })
}

var summary = () => {
  let url = 'runs'
  if(program.query) url = `${url}?q=${program.query}`
  return api(url)
    .then(res => {
      return Promise.all((res.docs || []).map(run => {
        return runSummary(run)
      }))
    })
}

summary()
  .catch(err => {
    console.log(err.message)
  })
