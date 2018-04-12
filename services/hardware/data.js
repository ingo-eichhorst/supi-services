'use strict'

let data = {}
let store = {}

/**
 * LOGS
 * 
 */

store.logs = []
data.log = {
  add (message) {
    store.logs.push(message)
    if (store.logs.length > 15) store.logs.shift()
  },
  get () {
    return store.logs
  }
}

/**
 * SYSTEM
 */
data.system = {
  set (comp, mode, value) {
    store[comp] = store[comp] || {}
    store[comp].mode = mode
    store[comp].value = value
  },
  get (comp) {
    return store.comp
  }
}

/**
 * MONIT
 */
store.monit = {}
data.monit = {
  set (node, comp, value) {
    const shortNode = node.substr(0,3)
    store.monit[shortNode] = store.monit[shortNode] || {}
    store.monit[shortNode][comp] = store.monit[shortNode][comp] || {}
    store.monit[shortNode][comp] = value
  },
  get () {
    return store.monit
  }
}

/**
 * EVENTS
 */
store.events = []
data.events = {
  add (event, node, message) {
    store.events.push({
      stamp: new Date().toISOString().slice(0, 19),
      event: event,
      node: node,
      msg: message
    })
    if (store.events.length > 8) store.events.shift()
  },

  get () {
    return store.events
  }
}

/**
 * NET SPEED
 */
store.speed = {}
data.speed = {
  set (download, upload) {
    store.speed.download = download
    store.speed.upload = upload
  },
  get () {
    return {
      download: store.speed.download || 0,
      upload: store.speed.upload || 0
    }
  }
}

/**
 * STORAGE
 */
store.storage = {}
data.storage = {
  set (usage, max, percentage) {
    store.storage.usage = usage
    store.storage.max = max
    store.storage.percent = percentage ||  (usage / max * 100)
  },
  get () {
    return store.storage
  }
}

module.exports = data
