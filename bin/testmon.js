#!/usr/bin/env node

var pkg = require('../package.json'),
    program = require('commander')

program
  .version(pkg.version)
  .command('serve', 'start the server')
  .command('import', 'import test result')
  .command('report', 'print the report')
  .command('config', 'configure testmon')
  .command('dashboard', 'start the dashboard')
  .command('poc', 'poc')
  .parse(process.argv)
