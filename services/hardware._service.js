'use strict'

const hw = require('./hardware')

module.exports = {
  name: 'hardware',
  settings: {
  },
  actions: {

    get: {
      params: {
        system: 'string'
      },
      handler (ctx) {
        return hw.get(ctx)
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
    /**
     * Welcome a username
     * 
     * @param {String} name - User name
     */
    shutdown: {
      params: {
      },
      handler (ctx) {
        return hw.shutdown()
      }
    }
  },

  /**
   * Events
   */
  events: {

    /* LOGS */
    'log.*' (payload, sender, eventName) {
      // let now = new Date()
      // let stamp = addZero(now.getHours()) + ':' + addZero(now.getMinutes()) + ':' + addZero(now.getSeconds())
      // let msg = JSON.stringify(payload)
      // let log = `[${stamp}] ${eventName}@${sender}: ${msg}`
      // data.log.add(log)
      // display.log(log)
      // display.update()
    },

    /* EVENTS */
    'event.*' (payload, sender, eventName) {
      // data.events.add(eventName, sender, payload)
      // display.update()
    },

    /* MONIT */
    'monit.cpu' (payload, sender, eventName) {
      // data.monit.set(sender, 'cpu', payload)
      // display.update()
    }
  },

  /**
   * Methods
   */
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
    hw.init()
  },
  stopped () {
  }
}
