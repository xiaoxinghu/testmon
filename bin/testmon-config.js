var rp = require('request-promise')
, chalk = require('chalk')
, util = require('util')
, program = require('commander')
, config = require.main.require('utils').config

program
  .option('-l, --list', 'show current config')
  .parse(process.argv)

console.log(util.inspect(config))
