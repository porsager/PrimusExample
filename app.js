const express = require('express')
    , websockets = require('./websockets')

const app = express()

app.use(express.static('public'))
app.use((req, res) => res.send('Hellow world'))

const server = app.listen(5000)

websockets.listen(server)

server.on('listening', () => console.log('Listening on port 5000'))
