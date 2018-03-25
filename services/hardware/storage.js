const data = require('./data')
const { exec } = require('child_process')

const readState = function (callback) {
  exec('df', (err, stdout, stderr) => {
    if (err) return callback(new Error('cannot find storage'))
    // /media/storage
    let storagePos = '/private/var/vm'
    if (!stdout.includes(storagePos)) return callback(new Error('cannot find storage'))
    const storeData = stdout.split('\n').find((str) => str.includes(storagePos)).split(/\s+/)
    return callback(null, {
      used: storeData[2],
      max: storeData[3]
    })
  })
}

const update = function () {
  readState((err, result) => {
    if (err) console.error(err)
    data.storage.set(result.used, result.max)
  })
}

module.exports = storage 

const storage = {
  init () {
    console.log('started')

    setInterval(() => {
      update()
    }, 10 * 60 * 1000)
    update()
  }
}
