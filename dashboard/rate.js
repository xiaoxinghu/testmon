var exports = module.exports = {},
    contrib = require('blessed-contrib'),
    barCategory = ['Q1', 'Q2', 'Q3', 'Q4'],
    stackedCategory = ['US', 'EU', 'AP'],
    chart,
    gaugeList;


// exports.mount = grid => {
//   gaugeList = grid.set(0, 6, 4, 6, contrib.gaugeList, {
//     label: 'Run Progress',
//     gaugeSpacing: 1,
//     gaugeHeight: 2,
//     gauges:
//     [ {showLabel: false, stack: [{percent: 30, stroke: 'green'}, {percent: 30, stroke: 'magenta'}, {percent: 40, stroke: 'cyan'}] }
//       , {showLabel: false, stack: [{percent: 40, stroke: 'yellow'}, {percent: 20, stroke: 'magenta'}, {percent: 40, stroke: 'green'}] }
//       , {showLabel: false, stack: [{percent: 50, stroke: 'red'}, {percent: 10, stroke: 'magenta'}, {percent: 40, stroke: 'cyan'}] } ]
//   });
// };

// exports.mount = grid => {
//   chart = grid.set(0, 6, 4, 6, contrib.stackedBar, {
//     label: 'Run Progress',
//     barWidth: 4,
//     barSpacing: 6,
//     xOffset: 0,
//     height: '40%',
//     width: '50%',
//     barBgColor: [ 'red', 'blue', 'green' ]
//   });

//   chart.setData({
//     barCategory: ['Q1', 'Q2', 'Q3', 'Q4'],
//     stackedCategory: ['US', 'EU', 'AP'],
//     data: [ [ 7, 7, 5]
//             , [8, 2, 0]
//             , [0, 0, 0]
//             , [2, 3, 2] ]
//   });
// };

exports.mount = grid => {
  chart = grid.set(0, 6, 4, 6, contrib.bar, {
    label: 'Run Progress',
    barWidth: 4,
    barSpacing: 6,
    xOffset: 2,
    maxHeight: 9
  });

  var data = [7, 7, 5, 4];
  chart.setData({
    titles: barCategory,
    data
  });
};

// exports.setData = data => {
//   table.setData({
//     headers,
//     data
//   });
// };
