let data = require('./data')
// let display = require('./display')

function addZero (i) { return (i < 10) ? i = '0' + i : i }

module.exports = {
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
    let log = `[${stamp}] ${eventName}@${sender}: ${msg}`
    data.log.add(log)
    if(eventName === 'log.speedtest') data.speed.set(payload.download, payload.upload)
    if(eventName === 'log.storage') data.storage.set(payload.used, payload.max, payload.percentage)

    console.log("LOG", log)
    // display.log(log)
    // display.update()
  },
  event (payload, sender, eventName) {
    data.events.add(eventName, sender, payload)
    console.log("EVENT", payload, sender, eventName)
    // display.update()
  },
  monit (payload, sender, eventName) {
    data.monit.set(sender, eventName.split('.')[1], payload)
    console.log("MONIT", payload, sender, eventName)
    // display.update()
  }
}