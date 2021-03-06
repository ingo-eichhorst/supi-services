'use strict'

const monit = require('./monit')

module.exports = {
  name: 'monit',
  settings: {},
  metadata: {},
  actions: {
    status (ctx) {
      return monit
    }
  },
  events: {},
  methods: {
    async monitSystem () {
      const result = await monit.checkSystem()
      this.broker.emit('monit.cpu', result.cpu_percent)
      this.broker.emit('monit.mem', result.mem_percent)
      this.broker.emit('monit.temp', result.cpu_temp)
      this.broker.emit('monit.disk', result.disk_percent)
      console.log('MONIT:', result)
    }
  },
  created () {},
  started () {
    setInterval(()=>{
      this.monitSystem()
    }, 30 * 1000)
    this.monitSystem()
  },
  stopped () {}
}
