'use strict'

var R = require('ramda')
, util = require('util')
, rename = require('../../utils').rename
, ps = require('xml2js').parseString

var toObj = xml => {
  return new Promise((resolve, reject) => {
    ps(xml, (err, obj) => {
      if (err) reject(err)
      resolve(obj)
    })
  })}

var sanitize = (v, k, o) => {
  if (k == 'duration' && isNaN(v))
    return Number(v)
  if (( k == 'start' || k == 'stop' )
      && !( v instanceof Date ))
    return Date.parse(v)
  return v
}

var processAttr = R.pipe(
  R.pathOr({}, ['$']),
  R.pick(['name', 'time', 'timestamp']),
  rename('timestamp')('start'),
  rename('time')('duration'),
  R.mapObjIndexed(sanitize)
)

var processProps = R.pipe(
  R.pathOr([], ['properties']),
  R.pluck('property'),
  R.flatten,
  R.pluck('$')
)

var process = R.curry((parent, obj) => {
  let attr = obj.$
  parent = Object.assign(parent, processAttr(obj))
  parent.meta = processProps(obj)
  let children = obj.testcase || R.path(['testsuites', 'testsuite'], obj)
  if (children) {
    parent.tests = children.map(child => process({}, child))
  }
  return parent
})

var show = obj => {
  console.log('>>>>> obj\n', util.inspect(obj, {
    showHidden: false,
    depth: null
  }))
  return obj
}

var parse = R.pipeP(toObj, process({}))
// var parse = R.pipeP(toObj, process({}), show)

module.exports = parse
