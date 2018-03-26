'use strict'
var si = require('systeminformation');

module.exports = {
  async checkSystem (systemType) {
    let cpu, temp, mem, stor
    
    try {
      cpu = await si.currentLoad(),
      temp = await si.cpuTemperature(),
      mem = await si.mem(),
      stor = await si.fsSize()
    } catch (e) {
      console.log(e)
    }

    /**
     * In some cases you need to install the linux sensors package 
     * to be able to measure temperature e.g. on DEBIAN based systems 
     * by running $ sudo apt-get install lm-sensors
     */

    let stat = {
      cpu_percent: Number(cpu.currentload.toFixed(2)),
      cpu_temp: temp.main,
      mem_percent: Number((mem.used/mem.total*100).toFixed(2)),
      mem_used: mem.used,
      mem_total: mem.total,
      disk_percent: Number(stor[0].use.toFixed(2)),
      disk_used: stor[0].used,
      disk_total: stor[0].size
    }

    console.log(stat)
    return stat
  }
}