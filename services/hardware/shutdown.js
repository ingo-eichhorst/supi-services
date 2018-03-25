const async = require('async')
const Client = require('ssh2').Client
const { exec } = require('child_process')

module.exports = (config, callback) => {
  async.eachSeries(config.worker, (singleWorker, callback) => {
    sshShutdown(singleWorker, config.user, config.password, (err, result) => {
      console.log(err || result)
      return callback()
    })
  }, err => {
    if (err) return console.log(err)
    localShutdown(err => { console.log(err) })
  })
}

const localShutdown = callback => {
  exec('sudo shutdown now', (err, stdout, stderr) => {
    if (err) return callback(err)
    console.log('shutdown this machine')
    return callback(null)
  })
}

const sshShutdown = (host, user, password, callback) => {
  var conn = new Client()
  conn.on('ready', function () {
    console.log('Client :: ready')
    conn.exec('sudo shutdown now', function (err, stream) {
      if (err) return console.log(err)
      stream.on('close', function (code, signal) {
        console.log('Stream :: close :: code: ' + code + ', signal: ' + signal)
        conn.end()
        return callback(null, 'host:', host, 'shutdown')
      }).on('data', function (data) {
        console.log('STDOUT: ' + data)
      }).stderr.on('data', function (data) {
        console.log('STDERR: ' + data)
      })
    })
  }).connect({
    host: host,
    port: 22,
    username: user,
    password: password
    // privateKey: require('fs').readFileSync('/here/is/my/key')
  })
}
