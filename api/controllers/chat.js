const mongoose = require('mongoose')
Chat = mongoose.model('Chat')


const createChat = async data => {
  const newChat = await new Chat({
    participants: [data.from, data.to],
    messages: [{
      from: data.from,
      to: data.to,
      date: data.date,
      text: data.text
    }],
    lastMessage: {
      from: data.from,
      to: data.to,
      date: data.date,
      text: data.text
    }
  })
  return newChat.save()
    .then(chat => chat)
    .catch(error => console.log(error))
}

const getChatByParticipants = async data => {
  return await Chat.find()
    .then(chat => {
      const users = [data.from, data.to]
      const currentChat = chat.find(elem =>
        elem.participants.every(user => users.indexOf(String(user)) !== -1)
      )

      return currentChat
    })
    .catch(error => console.log(error))
}

const addNewMessageInCurrentChat = async data => {
  return await Chat.findOneAndUpdate(
    { _id: data.chatId },
    {
      $push: {
        messages: {
          from: data.from,
          to: data.to,
          date: data.date,
          text: data.text
        }
      },
      lastMessage: {
        from: data.from,
        to: data.to,
        date: data.date,
        text: data.text
      }
    }
  )
}

const getCurrentUserChats = async (req, res) => {
  await Chat.find()
    .populate('participants')
    .then(data => {
      const chats = data.filter(chat =>
        chat.participants.find(elem => elem.id === req.params.userId)
      )

      res.send(chats || [])
    })
    .catch(error => console.log(error))
}

const getChatById = async (chatId) => {
  return await Chat.findById(chatId)
    .then(data => data)
    .catch(error => console.log(error))
}

const getCurrentChat = async (req, res) => {
  await Chat.findById(req.params.id)
    .populate('participants')
    .then(data => {
      res.send(data)
    })
    .catch(error => {
      res.status(500).send({
        message: error.message
      })
      res.send(error)
    })
}

const getMesssagesFromCurrentChat = async (req, res) => {
  await Chat.findById(req.params.id)
    .populate({
      path: 'messages.from',
      model: 'User'
    })
    .then(chat => res.send(chat.messages))
    .catch(error => {
      res.status(500).send({
        message: error.message
      })
      res.send(error)
    })
}

module.exports = {
  getMesssagesFromCurrentChat,
  getChatById,
  getCurrentUserChats,
  createChat,
  getChatByParticipants,
  addNewMessageInCurrentChat,
  getCurrentChat
}