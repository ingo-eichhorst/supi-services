
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
        serialport.on('data', function (data) {
          arduino.initialized = true
          return resolve(data[0])
        })
        serialport.on('error', function (err) {
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
 * setSerial('lc400') // sets the LED to confetti mode for 400 frames (-1 = infinite frames)
 * 
 * 
 * SET LED to
 * - k ==> Knight Rider
 * - c ==> Confetti
 * - g ==> Glitter
 * - j ==> Jiggle
 * - l ==> led display fan speed
 * - p ==> progress of something
 * - r ==> rainbow
 * - b ==> bpm
 * - o ==> Off
 */

arduino.setSerial = (command) => {
  serialport.write(command, () => {
    serialport.drain(err => console.log(err || 'succesfully sent message'))
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
