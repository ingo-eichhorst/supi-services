const speedtest = require('speedtest-net')
const data = require('./data')

const execteTest = (callback) => {
  let download, upload
  speedtest().on('uploadspeed', speed => {
    upload = speed.toFixed(2)
  }).on('downloadspeed', speed => {
    download = speed.toFixed(2)
  }).on('done', data => {
    callback(download, upload)
  })
}

const saveData = (download, upload) => {
  data.speed.set(download, upload)
}

module.exports = {
  init () {
    execteTest(saveData)
    setInterval(() => {
      execteTest(saveData)
    }, 1 * 60 * 1000)
  }
}
