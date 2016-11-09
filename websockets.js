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

  const players = Object.create(null)

  primus.save(path.join(__dirname, '/public/js/primus.js'))

  primus.on('connection', socket => {

    socket.on('authenticate', (data, response) => {
      if (data.uid in players)
        return response('AlreadyConnected')

      socket.uid = data.uid
      players[data.uid] = data
      primus.forEach(client => client.send('players', players))
    })

  })

  primus.on('disconnection', socket => {

    delete players[socket.uid]
    primus.forEach(client => client.send('players', players))

  })

}
