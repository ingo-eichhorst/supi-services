'use strict'

module.exports = {
  name: 'greeter',
  settings: {
  },
  metadata: {
  },
  actions: {
    hello (ctx) {
      this.broker.emit('log.info', ctx.nodeID)
      return ctx.nodeID
    },
    welcome: {
      params: {
        name: 'string'
      },
      handler (ctx) {
        return `Welcome, ${ctx.params.name}`
      }
    }
  },
  events: {
  },
  methods: {
  },
  created () {
  },
  started () {
  },
  stopped () {
  }
}
