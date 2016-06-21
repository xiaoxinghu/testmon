var R = require('ramda')

var split = queryStr => {
  return queryStr.split(' ').filter(Boolean)
}

var understand = (q, key, value) => {
  if (key == 'tag') {
    q.tags = q.tags || { $all: [] }
    q.tags.$all = q.tags.$all || []
    q.tags.$all.push(value)
  }
  if (key == '-tag') {
    q.tags = q.tags || { $nin: [] }
    q.tags.$nin = q.tags.$nin || []
    q.tags.$nin.push(value)
  }
  return q
}

var transform = (q, str) => {
  let parts = str.split(':')
  if (parts.length == 1) {
    q.keywords = q.keywords || []
    q.keywords.push(parts[0])
  }
  if (parts.length == 2) {
    q = understand(q, parts[0], parts[1])
  }
  return q
}

var process = R.pipe(
  split,
  trans => R.reduce(transform, {}, trans))

module.exports = process;
