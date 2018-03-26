// const data = require('./data')
const { exec } = require('child_process')
const fs = require('fs')
const { promisify } = require('util')

const readState = function (path, callback) {
  exec('df', (err, stdout, stderr) => {
    if (err) return callback(new Error('cannot find storage'))
    let storagePos = path
    if (!stdout.includes(storagePos)) return callback(new Error('cannot find storage'))
    const storeData = stdout.split('\n').find((str) => str.includes(storagePos)).split(/\s+/)
    return callback(null, {
      used: storeData[2],
      max: storeData[3],
      percentage: 1-(storeData[3]/storeData[2])
    })
  })
}

const update = function () {
  readState((err, result) => {
    if (err) console.error(err)
    data.storage.set(result.used, result.max)
  })
}

const storage = {
  init () {
    console.log('started')

    setInterval(() => {
      update()
    }, 10 * 60 * 1000)
    update()
  },
  check(path) {
    return promisify(readState)(path)
  }
}

module.exports = storage 
