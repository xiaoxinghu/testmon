var R = require('ramda')

var ifExistIs = Type => R.either(R.isNil, R.is(Type))

var evalData = ( report, path, data ) => {
  if (!data.name)
    report.errors.push({
      message: 'cannot find name', path })
  else if (typeof data.name !== 'string') {
    report.warns.push({
      message: 'names have to be a string, will try to convert it to string', path })
    data.name = data.name.toString()
  }

  for (let k of ['tests', 'tags']) {
    if ( !ifExistIs( Array )(data[k]) )
      report.errors.push({ message: `${k} needs to be an Array`, path })
  }

  for (let k of ['start', 'stop']) {
    if ( !ifExistIs( Date )(data[k]) )
      report.errors.push({ message: `${k} needs to be Date`, path })
  }

  if (data.duration) {
    if (!R.is(Number, data.duration)) {
      report.warns.push({
        message: 'duration have to be Number, try to convert it', path })
      data.duration = Number(data.duration)
    }
  }

  if (data.tests && Array.isArray(data.tests)) { // Run or Suite
    data.tests.forEach(( t, i ) => evalData(report, R.concat(path, [ 'tests' , i ]), t))
  } else { // Case
    if (!data.time && !data.start && !data.stop)
      report.warns.push({
        message: 'no time info (start|stop|time) found',
        path
      })
  }
  return report
}

var eval = data => {
  let report = evalData({errors: [], warns: []}, ['root'], data)
  let evaluated = {
    data,
    report,
    evaluated: true
  }
  if (report.errors.length > 0) return Promise.reject(evaluated)
  return Promise.resolve(evaluated)
}

module.exports = eval
