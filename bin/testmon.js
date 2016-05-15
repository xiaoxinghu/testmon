#!/usr/bin/env node

var pkg = require('../package.json'),
    program = require('commander');

program
  .version(pkg.version)
  .command('serve', 'start the server')
  .command('dashboard', 'start the dashboard')
  .command('poc', 'poc')
  .parse(process.argv);
