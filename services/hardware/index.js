// const arduino = require('./arduino')
// const display = require('./display')
const data = require('./data')
// const shutdown = require('./shutdown')
// const storage = require('./storage')
// const speedtest = require('./speedtest')
const config = require('./config')

function addZero (i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

module.exports = {
  init () {
    // return storage.check()
    //   .then(speedtest)
    // check connection to all hosts

  },
  conrtol (ctx) {
    // console.log(ctx.param)
    // // first letter of component + command
    // let modeString = ctx.param.mode ? ctx.param.mode[0] : ''
    // let command = ctx.param.comp[0] + modeString + ctx.param.value
    // arduino.setSerial(command)
    // return ctx.action.name
  },
  get (ctx) {
    // console.log(ctx.params)
    // if (!data[ctx.params.system]) return 'unknown system'
    // get nodes from 
    return config.master
  },
  shutdown () {
    // shutdown(config)
    // data.events.add('shutdown', 'call', new Date())
    // display.update()
    // return 'going to shutdown system'
  }
}

