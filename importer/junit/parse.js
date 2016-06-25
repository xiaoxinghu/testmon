'use strict'

var R = require('ramda')
, util = require('util')
, rename = require.main.require('utils').rename
, ps = require('xml2js').parseString

var toObj = xml => {
  return new Promise((resolve, reject) => {
    ps(xml, (err, obj) => {
      if (err) reject(err)
      resolve(obj)
    })
  })
}

var processAttr = R.pipe(
  R.pathOr({}, ['$']),
  R.pick(['name', 'time', 'timestamp']),
  rename('timestamp')('time'))

var processProps = R.pipe(
  R.pathOr([], ['properties']),
  R.pluck('property'),
  R.flatten,
  R.pluck('$'),
  R.map(p => ( [ p.name, p.value ] )),
  R.fromPairs)

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
  console.log('>>>>> obj', util.inspect(obj, {
    showHidden: false,
    depth: null
  }))
}

var parse = R.pipeP(toObj, process({name: 'root'}))
// var parse = R.pipeP(toObj, process({name: 'root'}), show)

module.exports = parse
