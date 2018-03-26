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
  },
  events: {},
  monit: {},
  methods: {
    async test () {
      console.log('starting speedtest ...')
      try {
        this.testResult = await speed.test()
      } catch (e) {
        console.log(e)
      }
      this.broker.emit('log.speedtest', this.testResult)
      console.log(this.testResult)
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
