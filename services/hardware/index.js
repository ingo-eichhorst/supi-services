const arduino = require('./arduino')
const shutdown = require('./shutdown')
const storage = require('./storage')
const config = require('./config')

module.exports = {
  async init () {
    let initResult
    try {
      const arduinoStatus = await arduino.init(config.serialPath)
    } catch (e) {
      return e
    }
    // return storage.check()
    //   .then(speedtest)
    // check connection to all hosts
    return initResult
  },
  conrtol (ctx) {
    // console.log(ctx.param)
    // // first letter of component + command
    // let modeString = ctx.param.mode ? ctx.param.mode[0] : ''
    // let command = ctx.param.comp[0] + modeString + ctx.param.value
    // arduino.setSerial(command)
    // return ctx.action.name
  },
  async status () {
    const storageStatus = await storage.check(config.mountPoint)
    const arduinoStatus = await arduino.check()

    return {
      storage: storageStatus,
      arduino: arduinoStatus,
      nodes: {
        master: config.master,
        worker: config.worker
      }
    }
  },
  async shutdown (ctx) {
    shutdown(config)
    return 'going to shutdown system'
  }
}

