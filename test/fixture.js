var factory = require('./factory'),
    util = require('util'),
    project = factory.project,
    run = factory.run;

function Fixture() {
  this.projects = [];
};

Fixture.prototype.gen = function() {
  this.projects.push(project.withoutRun.build({_id: 'without run'}));
  this.projects.push(project.withRuns.build({_id: 'with runs'}));
  return this;
};

Fixture.prototype.show = function() {
  console.log(util.inspect(this.projects, {showHidden: false, depth: null}));
};

var fixture = new Fixture().gen();
module.exports = fixture;

if (!module.parent) {
  fixture.show();
}
