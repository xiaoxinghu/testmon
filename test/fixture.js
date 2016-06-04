var factory = require('./factory'),
    util = require('util'),
    project = factory.project,
    run = factory.run;

function Fixture() {
  this.projects = [];
};

Fixture.prototype.gen = function() {
  this.projects.push(project.basic.build({_id: 'Basic'}));
  return this;
};

Fixture.prototype.show = function() {
  console.log(util.inspect(this.stat(), {showHidden: false, depth: null}));
};

Fixture.prototype.stat = function() {
  let stat = {
    projects: this.projects.length
  };
  return stat;
};

var fixture = new Fixture().gen();
module.exports = fixture;

if (!module.parent) {
  fixture.show();
}
