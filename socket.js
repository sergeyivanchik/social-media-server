const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./config/users')()


require('./api/models/user')
require('./api/models/chat')
const userController = require('./api/controllers/user')
const chatController = require('./api/controllers/chat')

io.sockets.on('connection', function (socket) {
  socket.on('changeOnline', data => {
    userController.changeOnline(data)

    const currentUser = users.get(data.userId)

    if (!currentUser) {
      users.add(data.userId, socket.id)
    } else {
      users.changeSocketId(data.userId, socket.id)
    }
  })

  socket.on('sendMessage', async data => {
    if (!data.chatId) {
      const chat = await chatController.getChatByParticipants({ from: data.from, to: data.to })

      if (!chat) {
        await chatController.createChat(data)
      } else {
        await chatController.addNewMessageInCurrentChat({...data, chatId: chat._id})
      }
      users.get(data.to)?.socketId &&
      io.sockets.connected[users.get(data.to).socketId].emit('newMessage', chat._id)
      io.sockets.connected[users.get(data.from).socketId].emit('newMessage', chat._id)
    }
  })

  socket.on('typingMessage', async data => {
    users.get(data.to)?.socketId &&
    io.sockets.connected[users.get(data.to).socketId].emit('typingMessage', data.from)
  })

  socket.on('disconnect', () => {
    const currentUser = users.remove(socket.id)

    if (currentUser) {
      const data = { userId: currentUser.userId, online: `${new Date().getTime()}` }
      userController.changeOnline(data)
    }
  })

  socket.on('unsubscribe', async data => {
    await userController.unsubscribe({ from: data.from, to: data.to, info: 'from'})
    await userController.unsubscribe({ from: data.to, to: data.from, info: 'to'})
    io.sockets.connected[users.get(data.to).socketId].emit('unsubscribe')
    io.sockets.connected[users.get(data.from).socketId].emit('unsubscribe')
  })

  socket.on('dontAddFriend', async data => {
    await userController.unsubscribe({ from: data.from, to: data.to, info: 'to'})
    await userController.unsubscribe({ from: data.to, to: data.from, info: 'from'})
    io.sockets.connected[users.get(data.to).socketId].emit('unsubscribe')
    io.sockets.connected[users.get(data.from).socketId].emit('unsubscribe')
  })

  socket.on('addFriend', async data => {
    await userController.addFriend({ from: data.from, to: data.to })
    await userController.unsubscribe({ from: data.to, to: data.from, info: 'from'})
    await userController.addFriend({ from: data.to, to: data.from })
    await userController.unsubscribe({ from: data.from, to: data.to, info: 'to'})
  })
})

module.exports = {
  app,
  server
}
