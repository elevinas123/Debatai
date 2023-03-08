import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    
    io.on('connection', socket => {
      socket.on('input-change', msg => {
        socket.broadcast.emit('update-input', msg)
      })
      socket.on("offer", ([id ,offerId, offer]) => {
        socket.broadcast.emit(`${id}-offer`, [offer, offerId])
      })
      socket.on("answer", ([id, offerId, answer]) =>  {
        socket.broadcast.emit(`${offerId}-answer`, answer)
      })
    })
  }
  res.end()
}

export default SocketHandler
