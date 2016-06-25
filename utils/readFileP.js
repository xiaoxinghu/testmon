var fs = require('fs')

var readFileP = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, xml) => {
      if (err) reject(err)
      resolve(xml)
    })
  })
}

module.exports = readFileP
