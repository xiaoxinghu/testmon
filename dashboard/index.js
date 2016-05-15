var blessed = require('blessed'),
    contrib = require('blessed-contrib'),
    table = require('./table'),
    rate = require('./rate');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

var grid = new contrib.grid({rows: 12, cols: 12, screen: screen});
screen.title = 'Dashboard';
table.mount(grid);
rate.mount(grid);

// var t = grid.set(0, 0, 4, 4, table);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

module.exports = screen;

