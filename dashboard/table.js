var exports = module.exports = {},
    contrib = require('blessed-contrib'),
    headers = ['run', 'passed', 'failed', 'broken', 'pending'],
    table;

exports.mount = grid => {
  table = grid.set(0, 0, 12, 4, contrib.table, {
    keys: true
    , fg: 'white'
    , selectedFg: 'white'
    , selectedBg: 'blue'
    , interactive: true
    , label: 'Runs'
    , width: '30%'
    , height: '30%'
    , border: {type: "line", fg: "cyan"}
    , columnSpacing: 2 //in chars
    , columnWidth: [6, 6, 6, 6, 6] /*in chars*/ });

  table.focus();
};

exports.setData = data => {
  table.setData({
    headers,
    data
  });
};
