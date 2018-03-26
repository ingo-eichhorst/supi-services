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
        key: 'string',
        value: 'string'
      },
      handler (ctx) {
        return hw.control(ctx)
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
  events: {},
  monit: {},
  methods: {},
  created () {},
  async started () {
    let initResult = await hw.init()
    console.log('Arduino init result:', initResult)
    setInterval(async () => {
      let stat = await hw.status()
      this.broker.emit('log.storage', stat.storage)
    }, 1 * 30 * 1000)
    let stat = await hw.status()
    this.broker.emit('log.storage', stat.storage)
    
  },
  stopped () {}
}
