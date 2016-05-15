var blessed = require('blessed'),
    contrib = require('blessed-contrib');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

var grid = new contrib.grid({rows: 12, cols: 12, screen: screen});

screen.title = 'Dashboard';

var bar = grid.set(0, 0, 4, 4, contrib.stackedBar, {
  label: 'Last Runs'
  , barWidth: 4
  , barSpacing: 6
  , xOffset: 0
  //, maxValue: 15
  , height: "40%"
  , width: "50%"
  , barBgColor: [ 'green', 'red', 'yellow' ]});

var table = grid.set(0, 4, 4, 4, contrib.table, {
  keys: true
  , fg: 'white'
  , selectedFg: 'white'
  , selectedBg: 'blue'
  , interactive: true
  , label: 'Active Processes'
  , width: '30%'
  , height: '30%'
  , border: {type: "line", fg: "cyan"}
  , columnSpacing: 10 //in chars
  , columnWidth: [16, 12, 12] /*in chars*/ });

bar.setData(
  { barCategory: ['UT', 'IT', 'FT', 'UIT']
    , stackedCategory: ['Passed', 'Failed', 'Broken']
    , data:
    [ [ 7, 7, 5]
      , [8, 2, 0]
      , [0, 0, 0]
      , [2, 3, 2] ]
  });

//allow control the table with the keyboard
table.focus();

table.setData(
  { headers: ['col1', 'col2', 'col3']
    , data:
    [ [1, 2, 3]
      , [4, 5, 6] ]});

// var t = grid.set(0, 0, 4, 4, table);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});
// Render the screen.
screen.render();
