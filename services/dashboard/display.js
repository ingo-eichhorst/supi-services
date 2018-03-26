'use strict'
/**
  * DISPLAY
  * Display refresh every x-seconds
  */

/*
    |------------------------
    |n1 |n2 |n3 |n4 | log1  |
    | * |   |   |   | log2  |
    | * |   |   |   | log3  |
    |------------------------
    | Last Event    | store |
    | (!log&!monit) |-------|
    |               | speed |
    |------------------------
  */

// Dashboard + Display
// -> Enable/Disable
// -> Events
// -> Health
// -> Logs
// -> Docker

// TODO: Splash Screen
//
// _____/\\\\\\\\\\\____/\\\________/\\\________________/\\\\\\\\\\\\\____/\\\\\\\\\\\_        
//  ___/\\\/////////\\\_\/\\\_______\/\\\_______________\/\\\/////////\\\_\/////\\\///__       
//   __\//\\\______\///__\/\\\_______\/\\\_______________\/\\\_______\/\\\_____\/\\\_____      
//    ___\////\\\_________\/\\\_______\/\\\__/\\\\\\\\\\\_\/\\\\\\\\\\\\\/______\/\\\_____     
//     ______\////\\\______\/\\\_______\/\\\_\///////////__\/\\\/////////________\/\\\_____    
//      _________\////\\\___\/\\\_______\/\\\_______________\/\\\_________________\/\\\_____   
//       __/\\\______\//\\\__\//\\\______/\\\________________\/\\\_________________\/\\\_____  
//        _\///\\\\\\\\\\\/____\///\\\\\\\\\/_________________\/\\\______________/\\\\\\\\\\\_ 
//         ___\///////////________\/////////___________________\///______________\///////////__

const blessed = require('blessed')
const contrib = require('blessed-contrib')
const Grid = contrib.grid
const screen = blessed.screen()
const data = require('./data')

var grid = new Grid({rows: 12, cols: 12, screen: screen})

let r = () => Math.round(Math.random() * 100)

var log = grid.set(0, 0, 7, 7, contrib.log,
  { fg: 'green', selectedFg: 'green', label: 'HTTP Log' })

function updateScreen () {
  /* CPU */
  var bar = grid.set(0, 7, 7, 5, contrib.bar,
    { label: 'Server Utilization (%)', barWidth: 4, barSpacing: 4, xOffset: 2, maxHeight: 100 })
  let monit = data.monit.get()
  let titles = []
  let values = []
  for (let node in monit) {
    titles.push(node.substr(0, 3))
    values.push(monit[node]['cpu'] || 0)
  }
  bar.setData({
    titles: titles,
    data: values
  })

  // grid.set(row, col, rowSpan, colSpan, obj, opts)

  /* STORAGE */
  let storage = data.storage.get()
  let sp = storage.percent || 0
  var gauge = grid.set(7, 7, 2, 5, contrib.gauge, {label: 'Storage', percent: [0, 100]})
  gauge.setData(sp, 100 - sp)

  /* SPEED TEST */
  let gVal = r()
  var gaugeTwo = grid.set(9, 7, 3, 5, contrib.gauge, {label: 'Network Speed', percent: 100})
  gaugeTwo.setData(gVal / 2)

  let { download, upload } = data.speed.get()
  var bar2 = grid.set(9, 7, 3, 5, contrib.bar,
    { label: 'Network Speed', barWidth: 10, barSpacing: 4, xOffset: 2, maxHeight: 10 })
  bar2.setData({
    titles: ['Download', 'Upload'],
    data: [download, upload]
  })

  /* EVENTS */
  var markdown = grid.set(7, 0, 5, 7, contrib.markdown, {label: 'Latest Event'})
  let events = data.events.get()
  let eventsString = ''

  events.reverse().forEach(e => {
    eventsString += `# [${e.stamp}] ${e.event} @ ${e.node} \n ${JSON.stringify(e.msg)} \n`
  })
  markdown.setMarkdown(eventsString)

  screen.render()
}

setInterval(() => {
  updateScreen()
}, 10000)

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0)
})

// updateScreen()

module.exports = {
  // update: updateScreen,
  update: console.log,
  log (str) {
    log.log(str)
  }
}
