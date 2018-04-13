const arduino = require('./arduino')
const shutdown = require('./shutdown')
const storage = require('./storage')
const config = require('./config')
const data = require('./data')

function addZero (i) { return (i < 10) ? i = '0' + i : i }

arduino.init(config.serialPath)

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
    //console.log('controlling arduino')
    // first letter of component + command
    let modeString = ''
    if(ctx.params.mode && ctx.params.mode !== 'manual') modeString = ctx.params.mode[0] || ''
    let command = ctx.params.system[0] + modeString + ctx.params.value
    //console.log('set arduino...')
    arduino.setSerial(command)
    return ctx.params
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
    return this.loadData()
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
  },
  event (payload, sender, eventName) {
    data.events.add(eventName, sender, payload)
  },
  monit (payload, sender, eventName) {
    data.monit.set(sender, eventName.split('.')[1], payload)
  }
}

