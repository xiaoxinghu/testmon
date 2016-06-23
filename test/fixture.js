var factory = require('./factory'),
    util = require('util'),
    project = factory.project,
    run = factory.run;

function Fixture() {
  this.runs = [];
};

Fixture.prototype.gen = function() {
  this.runs = this.runs.concat(run.grouped.buildList(5));
  return this;
};

Fixture.prototype.show = function() {
  console.log(util.inspect(this.runs, {showHidden: false, depth: null}));
};

Fixture.prototype.stat = function() {
  let stat = {
    runs: this.runs.length
  };
  return stat;
};

var fixture = new Fixture().gen();
module.exports = fixture;

if (!module.parent) {
  fixture.show();
}
