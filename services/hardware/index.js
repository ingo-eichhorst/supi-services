const arduino = require('./arduino')
const shutdown = require('./shutdown')
const storage = require('./storage')
const config = require('./config')
let data = require('./data')

let display
if(process.env.DISPLAY_TYPE === 'HDMI') {
  display = require('./display')
} else display = {
  log: console.log,
  update () {
    console.log('Display update')
  }
}
function addZero (i) { return (i < 10) ? i = '0' + i : i }

module.exports = {
  // TODO: Start connections and check functionality
  async init () {
    let initResult
    // try {
    //   const arduinoStatus = await arduino.init(config.serialPath)
    // } catch (e) {
    //   return e
    // }
    // return storage.check()
    //   .then(speedtest)
    // check connection to all hosts
    return initResult
  },
  conrtol (ctx) {
    console.log(ctx.param)
    // first letter of component + command
    let modeString = ctx.param.mode ? ctx.param.mode[0] : ''
    let command = ctx.param.comp[0] + modeString + ctx.param.value
    arduino.setSerial(command)
    return ctx.action.name
  },
  async status () {
    // const storageStatus = await storage.check(config.mountPoint)
    // const arduinoStatus = await arduino.check()

    // return {
    //   storage: storageStatus,
    //   arduino: arduinoStatus,
    //   nodes: {
    //     master: config.master,
    //     worker: config.worker
    //   }
    // }
  },
  async shutdown (ctx) {
    shutdown(config)
    return 'going to shutdown system'
  },
  loadData () {
    return {
      monit: data.monit.get(),
      events: data.events.get(),
      speed: data.speed.get(),
      storage: data.storage.get(),
      log: data.log.get(),
      system: data.system.get()
    }
  },
  log (payload, sender, eventName) {
    let now = new Date()
    let stamp = addZero(now.getHours()) + ':' + addZero(now.getMinutes()) + ':' + addZero(now.getSeconds())
    let msg = JSON.stringify(payload)
    let log = `[${stamp}] ${eventName}@${sender.substr(0,3)}: ${msg}`
    data.log.add(log)
    if(eventName === 'log.speedtest') data.speed.set(payload.download, payload.upload)
    if(eventName === 'log.storage') data.storage.set(payload.used, payload.max, payload.percentage*100)

    // console.log("LOG", log)
    // display.log(log)
    // display.update()
  },
  event (payload, sender, eventName) {
    data.events.add(eventName, sender, payload)
    // console.log("EVENT", payload, sender, eventName)
    // display.update()
  },
  monit (payload, sender, eventName) {
    data.monit.set(sender, eventName.split('.')[1], payload)
    // console.log("MONIT", payload, sender, eventName)
    // display.update()
  }
}

