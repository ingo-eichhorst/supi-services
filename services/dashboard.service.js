'use strict'

let display = require('./dashboard')

module.exports = {
  name: 'dashboard',
  settings: {},
  actions: {
    status () {
      return display.loadData()
    }
  },
  events: {
    /* LOGS */
    'log.*' (payload, sender, eventName) {
      display.log(payload, sender, eventName)
      // console.log(payload, sender, eventName)
    },
    /* EVENTS */
    'event.*' (payload, sender, eventName) {
      display.event(payload, sender, eventName)

      // data.events.add(eventName, sender, payload)
      // display.update()
    },
    /* MONIT */
    'monit.cpu' (payload, sender, eventName) {
      display.monit(payload, sender, eventName)

      // data.monit.set(sender, 'cpu', payload)
      // display.update()
    }
  },
  monit: {},
  methods: {
    // saveMonit: (host, key, value) => {
    //   let m = this.monit
    //   m.host = m.host || {}
    //   m.host[key] = value
    //   return m
    // }
  },
  created () {},
  started () {},
  stopped () {}
}
