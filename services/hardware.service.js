'use strict'

const hw = require('./hardware')

module.exports = {
  name: 'hardware',
  settings: {},
  actions: {
    status: {
      handler (ctx) {
        return hw.status(ctx)
      }
    },
    control: {
      params: {
        system: 'string',
        mode: 'string',
        // key: 'string',
        value: 'string'
      },
      handler (ctx) {
        return hw.conrtol(ctx)
      }
    },
    shutdown: {
      handler (ctx) {
        hw.shutdown()
        // set display to splash screen
        this.broker.emit('event.shutdown', 'call', new Date())
      }
    }
  },
  events: {
    /* LOGS */
    'log.*' (payload, sender, eventName) {
      hw.log(payload, sender, eventName)
      // console.log(payload, sender, eventName)
    },
    /* EVENTS */
    'event.*' (payload, sender, eventName) {
      hw.event(payload, sender, eventName)

      // data.events.add(eventName, sender, payload)
      // display.update()
    },
    /* MONIT */
    'monit.cpu' (payload, sender, eventName) {
      hw.monit(payload, sender, eventName)

      // data.monit.set(sender, 'cpu', payload)
      // display.update()
    }
  },
  monit: {},
  methods: {},
  created () {},
  // async 
  started () {
    // let initResult = await hw.init()
    // console.log('Arduino init result:', initResult)
    // setInterval(async () => {
    //   let stat = await hw.status()
    //   this.broker.emit('log.storage', stat.storage)
    // }, 1 * 30 * 1000)
    // let stat = await hw.status()
    // this.broker.emit('log.storage', stat.storage)
  },
  stopped () {}
}
