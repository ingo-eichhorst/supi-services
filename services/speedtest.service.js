'use strict'

const speed = require('./speedtest')

module.exports = {
  name: 'speedtest',
  settings: {},
  actions: {
    status: {
      handler (ctx) {
        return this.testResult
      }
    },
    test: {
      handler (ctx) {
        this.test()
        return {message: 'starting speedtest ...'}
      }
    }
  },
  events: {},
  monit: {},
  methods: {
    async test () {
      this.broker.emit('log.info', 'starting speedtest...')
      try {
        this.testResult = await speed.test()
      } catch (e) {
        console.log(e)
      }
      this.broker.emit('log.speedtest', this.testResult)
      return this.testResult
    }
  },
  created () {},
  started () {
    setInterval(() => {
      this.test()
    }, 30 * 60 * 1000)
    this.test()
  },
  stopped () {}
}
