const socket = Primus.connect('ws://localhost:5000/primus')

socket.on('data', data => {
  // This is all data sent through the primus parser
  console.log('data', data)
})

socket.on('custom', (data, callback) => {
  // This is only what was sent on a namespaced primus-requests request :P
  console.log('custom', data)
  callback('Response from client')
})

socket.send('custom', 'Request from client', data => {
  console.log('server:', data)
})

socket.write('Raw data from client')
