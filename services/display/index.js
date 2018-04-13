'use strict'

const blessed = require('blessed')
const contrib = require('blessed-contrib')
const Grid = contrib.grid
const screen = blessed.screen()

var grid = new Grid({rows: 12, cols: 12, screen: screen})

let r = () => Math.round(Math.random() * 100)

function updateScreen (data) {
  /* CPU */
  var bar = grid.set(0, 7, 7, 5, contrib.bar,
    { label: 'Server Utilization (%)', barWidth: 4, barSpacing: 4, xOffset: 2, maxHeight: 100 })
  let monit = data.monit
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
  /* STORAGE */
  let storage = data.storage
  let sp = storage.percent || 0
  var gauge = grid.set(7, 7, 2, 5, contrib.gauge, {label: 'Storage', percent: [0, 100]})
  gauge.setData(sp, 100 - sp)

  /* SPEED TEST */
  let gVal = r()
  var gaugeTwo = grid.set(9, 7, 3, 5, contrib.gauge, {label: 'Network Speed', percent: 100})
  gaugeTwo.setData(gVal / 2)

  let { download, upload } = data.speed
  var bar2 = grid.set(9, 7, 3, 5, contrib.bar,
    { label: 'Network Speed', barWidth: 10, barSpacing: 4, xOffset: 2, maxHeight: 10 })
  bar2.setData({
    titles: ['Download', 'Upload'],
    data: [download, upload]
  })

  /* EVENTS */
  var markdown = grid.set(7, 0, 5, 7, contrib.markdown, {label: 'Latest Event'})
  let events = JSON.parse(JSON.stringify(data.events))
  let reversedEvents = events.reverse()
  let eventsString = ''

  reversedEvents.forEach(e => {
    eventsString += `# [${e.stamp}] ${e.event} @ ${e.node} \n ${JSON.stringify(e.msg)} \n`
  })
  markdown.setMarkdown(eventsString)

  /* LOG */
  let log = grid.set(0, 0, 7, 7, contrib.markdown, { fg: 'green', selectedFg: 'green', label: 'Log' })
  let logString = ''
  let logs = JSON.parse(JSON.stringify(data.log))
  let reversedLogs = logs.reverse()
  reversedLogs.forEach(l=>{
    logString += `${l}\n`
  })
  log.setMarkdown(logString)

  screen.render()
}

module.exports = {
  updateScreen
}

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0)
})