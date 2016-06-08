var rp = require('request-promise'),
    chalk = require('chalk'),
    moment = require('moment'),
    util = require('util'),
    config = require('../utils/config');

const style = {
  passed: chalk.green,
  failed: chalk.red,
  broken: chalk.yellow,
  pending: chalk.gray
};

var api = path => {
  return rp({
    uri: `http://${config.remote}:${config.port}/api/${path}`,
    json: true
  });
};

var runSummary = run => {
  return api(`runs/${run._id}/stats`).then(res => {
    console.log('  ---------------------------------------');
    // let stop = moment(run.stop);
    // let start = moment(run.start);
    // let duration = stop.diff(start, 'seconds');
    console.log(`  ${chalk.gray(run.start)} ${run.name}`);
    for (var status in res) {
      console.log(style[status](`    ${res[status]}\t${status}`));
    }
  });
};

var projectSummary = project => {
  return api(`projects/${project}`)
    .then(res => {
      console.log(chalk.blue.bold(res._id.toUpperCase()));
      return api(`runs?project=${project}`);
    }).then(res => {
      return Promise.all((res.docs || []).map(run => {
        return runSummary(run);
      }));
    });
};

var summary = () => {
  return api('projects')
    .then(res => {
      return Promise.all((res || []).map(project => {
        return projectSummary(project._id);
      }));
    });
};

summary()
  .catch(err => {
    console.log(err.message);
  });

