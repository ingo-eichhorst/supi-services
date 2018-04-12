'use strict'

let display
if(process.env.DISPLAY_TYPE === 'HDMI') {
  display = require('./display')
} else display = {
  updateScreen (data) {
    console.log(JSON.stringify(data))
  }
}

module.exports = {
  name: 'hardware',
  settings: {},
  actions: {},
  events: {},
  monit: {},
  methods: {
    async update(){
      const data = await broker.call("hardware.status")
      display.updateScreen(data)
    }
  },
  created () {
    console.log(`
         SSSSSSSSSSSSSSS UUUUUUUU     UUUUUUUU                 PPPPPPPPPPPPPPPPP   IIIIIIIIII
       SS:::::::::::::::SU::::::U     U::::::U                 P::::::::::::::::P  I::::::::I
      S:::::SSSSSS::::::SU::::::U     U::::::U                 P::::::PPPPPP:::::P I::::::::I
      S:::::S     SSSSSSSUU:::::U     U:::::UU                 PP:::::P     P:::::PII::::::II
      S:::::S             U:::::U     U:::::U                    P::::P     P:::::P  I::::I  
      S:::::S             U:::::D     D:::::U                    P::::P     P:::::P  I::::I  
       S::::SSSS          U:::::D     D:::::U                    P::::PPPPPP:::::P   I::::I  
        SS::::::SSSSS     U:::::D     D:::::U  ---------------   P:::::::::::::PP    I::::I  
          SSS::::::::SS   U:::::D     D:::::U  -:::::::::::::-   P::::PPPPPPPPP      I::::I  
             SSSSSS::::S  U:::::D     D:::::U  ---------------   P::::P              I::::I  
                  S:::::S U:::::D     D:::::U                    P::::P              I::::I  
                  S:::::S U::::::U   U::::::U                    P::::P              I::::I  
      SSSSSSS     S:::::S U:::::::UUU:::::::U                  PP::::::PP          II::::::II
      S::::::SSSSSS:::::S  UU:::::::::::::UU                   P::::::::P          I::::::::I
      S:::::::::::::::SS     UU:::::::::UU                     P::::::::P          I::::::::I
       SSSSSSSSSSSSSSS         UUUUUUUUU                       PPPPPPPPPP          IIIIIIIIII
    `)
  },
  dependencies: [
    "hardware"
  ],
  started () {
    this.updateInterval = setInterval(()=>{
      this.update()
    },10000)
    this.update()
  },
  stopped () {
    clearInterval(this.updateInterval)
  }
}
