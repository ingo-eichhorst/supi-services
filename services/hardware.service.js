'use strict'

const hw = require('./hardware')

module.exports = {
  name: 'hardware',
  settings: {
  },
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
        this.broker.emit('shutdown', 'call', new Date())
      }
    }
  },
  events: {
  },
  monit: {},
  methods: {
  },
  created () {
  },
  async started () {
    let initResult = await hw.init()
    console.log('Arduino init result:', initResult)
  },
  stopped () {
  }
}
