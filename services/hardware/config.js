module.exports = {
  mountPoint: process.env.SUPI_STORAGE,
  serialPath: process.env.SUPI_ARDUINO_SERIAL,
  master: ['192.168.188.200'],
  worker: ['192.168.188.201', '192.168.188.202', '192.168.188.203'],
  user: 'pirate',
  password: 'hypriot'
}