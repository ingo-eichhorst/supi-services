
var SerialPort = require('serialport')
var serialport
// TODO: make sure the device is hooked up as 
// docker mount or locally before connecting

let arduino = {}

/**
 * TODO: Connect to Arduino and check that commands can be sent and received
 */
arduino.init = (serial) => {
  return new Promise((resolve,reject) => {
    if(serial) {
      serialport = new SerialPort(serial)
      serialport.on('open', function () {
        console.log('Serial Port Opend')
        serialport.on('data', function (data) {
          console.log(data[0])
          arduino.initialized = true
          return resolve(data[0])
        })
        serialport.on('error', function (err) {
          console.log('cannot connect to arduino:', err)
          return reject(err)
        })
      })
    } else {
      reject('no arduino available')
    }
  })
}

/**
 * Send a command over the serial connection
 * 
 * @param {string} Command to execute on the arduino
 *                 f|l (fan or led)
 *                 <command> (e.g. 10 or demo)
 * @example 
 * setSerial('f67') // sets the fan to speed 67%
 * @example
 * setSerial('lc400') // sets the LED to confetti mode for 400 frames
 */

arduino.setSerial = (command) => {
  console.log(command)
  return new Promise((reject,resolve)=>{
    if(!arduino.initialized) return reject('no arduino available')

    serialport.write(command, () => {
      serialport.drain(err => console.log(err || 'succesfully sent message'))
    })
  })
}

arduino.check = () => {
  return new Promise((reject,resolve)=>{
    if(!arduino.initialized) return reject('no arduino initialized')

    // DEMO CODE
    return resolve('OK')

    serialport.write(command, () => {
      serialport.drain(err => console.log(err || 'succesfully sent message'))
    })
  })
}

module.exports = arduino
