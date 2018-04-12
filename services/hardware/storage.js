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

const update = async function (path) {
  readState(path, async (err, result) => {
    if (err) console.error(err)
    let status = await data.storage.set(result.used, result.max)
    return status
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
  async check(path) {
    return await update(path)
  }
}

module.exports = storage 
