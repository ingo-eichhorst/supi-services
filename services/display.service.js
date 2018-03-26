'use strict'

// const config = {
//   mountPoint: '/media/storage',
//   serialPath: '/device/...',
//   master: ['192.168.188.200'],
//   worker: ['192.168.188.201', '192.168.188.202', '192.168.188.203'],
//   user: 'pirate',
//   password: 'hypriot'
// }

// let arduino = require('./hardware/arduino')
let display = require('./hardware/display')
let data = require('./hardware/data')

function addZero (i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

module.exports = {
  name: 'display',
  settings: {
    logLevel: 'error',
  },
  actions: {
  },
  events: {
    /* LOGS */
    'log.*' (payload, sender, eventName) {
      let now = new Date()
      let stamp = addZero(now.getHours()) + ':' + addZero(now.getMinutes()) + ':' + addZero(now.getSeconds())
      let msg = JSON.stringify(payload)
      let log = `[${stamp}] ${eventName}@${sender}: ${msg}`
      data.log.add(log)
      display.log(log)
      display.update()
    },
    /* EVENTS */
    'event.*' (payload, sender, eventName) {
      data.events.add(eventName, sender, payload)
      display.update()
    },
    /* MONIT */
    'monit.cpu' (payload, sender, eventName) {
      data.monit.set(sender, 'cpu', payload)
      display.update()
    }
  },
  monit: {},
  methods: {
    saveMonit: (host, key, value) => {
      let m = this.monit
      m.host = m.host || {}
      m.host[key] = value
      return m
    }
  },
  created () {
  },
  started () {
  },
  stopped () {
  }
}
