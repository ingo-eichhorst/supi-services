const speedtest = require('speedtest-net')
const { promisify } = require('util')

const execteTest = (callback) => {
  let download, upload
  speedtest().on('uploadspeed', speed => {
    upload = speed.toFixed(2)
  }).on('downloadspeed', speed => {
    download = speed.toFixed(2)
  }).on('done', data => {
    callback({download, upload})
  })
}

module.exports = {
  async test () {
    let result
    try {
      result = await promisify(execteTest)()
    } catch (e) {
      return e
    }
    return result
  }
}
