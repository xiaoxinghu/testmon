var R = require('ramda')

var split = queryStr => {
  return queryStr.split(' ').filter(Boolean)
}

var transform = R.reduce((q, str) => {
  let parts = str.split(':')
  if (parts.length == 1) {
    q.keywords = q.keywords || []
    q.keywords.push(parts[0])
  }
  if (parts.length == 2) {
    q[parts[0]] = q[parts[0]] || []
    q[parts[0]].push(parts[1])
  }
  return q
}, {})

var understand = q => {
  let query = {
    tags: {
      include: [],
      exclude: []
    }
  }
  if (q.tag) query.tags.include = q.tag
  if (q['-tag']) query.tags.exclude = q['-tag']
  if (q.start) query.start = q.start[0]
  if (q.stop) query.stop = q.stop[0]
  if (q.keywords) query.keywords = q.keywords
  return query
}

var process = R.pipe(
  split,
  transform,
  understand)

module.exports = process;
