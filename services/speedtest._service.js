'use strict'

const speedtest = require('./speedtest')

module.exports = {
  name: 'speedtest',
  settings: {
  },
  actions: {
    status: {
      params: {
        system: 'string'
      },
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
        return hw.shutdown()
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
  started () {
    hw.init()
  },
  stopped () {
  }
}
