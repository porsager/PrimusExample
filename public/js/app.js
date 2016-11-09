/* global m, Primus */

const socket = Primus.connect('ws://localhost:5000/primus')

let user = { uid: Math.random() }
let players = {}

socket.send('authenticate', user, data => {
  console.log(data)
})

socket.on('players', data => {
  players = data
  m.redraw()
})

m.mount(document.body, {
  view: vnode => m('div', [
    m('pre', 'user: ', JSON.stringify(user, null, 2)),
    m('pre', 'players: ', JSON.stringify(players, null, 2))
  ])
})
