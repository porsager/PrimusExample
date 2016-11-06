const Primus = require('primus')
    , path = require('path')
    , primusRequests = require('primus-requests')

const sockets = module.exports

sockets.listen = function(server) {
  const primus = sockets.primus = new Primus(server, {
    transformer: 'uws',
    plugin: {
      requests: primusRequests
    }
  })

  primus.save(path.join(__dirname, '/public/js/primus.js'))

  primus.on('connection', socket => {

    socket.on('custom', (data, callback) => {
      console.log('custom', data)
      callback('Response from server')
    })

    socket.on('data', data => {
      console.log('data', data)
    })

    socket.send('custom', 'Request from server', data => {
      console.log('client:', data)
    })

    socket.write('Raw data from server')
  })
}
