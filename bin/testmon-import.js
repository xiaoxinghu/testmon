var rp = require('request-promise')
, chalk = require('chalk')
, util = require('util')
, program = require('commander')
, config = require.main.require('utils').config

program
  .option('-t, --type [type]', 'test type')
  .parse(process.argv)

console.log('type:', program.type)
