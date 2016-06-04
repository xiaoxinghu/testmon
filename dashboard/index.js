var blessed = require('blessed'),
    contrib = require('blessed-contrib'),
    table = require('./table'),
    rate = require('./rate');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

// create grid
var grid = new contrib.grid({rows: 12, cols: 12, screen: screen});
screen.title = 'Dashboard';

// mount widgets
table.mount(grid);
rate.mount(grid);

// set data on table
setInterval(() => {
  var data = [];

  for (var i=0; i<30; i++) {
    var row = [];
    row.push(Math.round(Math.random()*5));
    row.push(Math.round(Math.random()*100));
    row.push(Math.round(Math.random()*100));
    row.push(Math.round(Math.random()*100));
    row.push(Math.round(Math.random()*100));
    data.push(row);
  }
  table.setData(data);
  screen.render();
}, 3000);

// quit with q
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

module.exports = screen;

