
// var SerialPort = require('serialport').SerialPort
// TODO: make sure the device is hooked up as 
// docker mount or locally before connecting

// ACTIVATE
// var serialport = new SerialPort('/dev/tty.usbmodem1421')
// serialport.on('open', function () {
//   console.log('Serial Port Opend')
//   serialport.on('data', function (data) {
//     console.log(data[0])
//   })
// })

let arduino = {}

/**
 * TODO: Connect to Arduino and check that commands can be sent and received
 */
arduino.init = () => {

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

  // ACTIVATE
  // serialPort.write(command, () => {
  //   serialport.drain(err => console.log(err || 'succesfully sent message'))
  // })
}

module.exports = arduino
