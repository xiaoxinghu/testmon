#!/usr/bin/env node

var rp = require('request-promise')
, chalk = require('chalk')
, db = require('../utils').db
, fs = require('fs')
, program = require('commander')
, app = require('..')

program
  .option('-t, --type <type>', 'test type')
  .option('-d, --data <data>', 'test data')
  .option('-n, --name <name>', 'test name')
  .parse(process.argv)

var options = {
  method: 'POST',
  uri: `http://${app.config.remote}:${app.config.port}/api/import`,
  json: true,
  formData: {
    name: program.name,
    type: program.type,
    file: fs.createReadStream(program.data)
  }
}

rp(options).then(body => {
  console.log(body)
}).catch(console.log)
