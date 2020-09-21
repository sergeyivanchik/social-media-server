class Users {
  constructor() {
    this.users = []
  }

  add(userId, socketId) {
    this.users.push({
      userId,
      socketId
    })
  }

  get(userId) {
    return this.users.find(user => user.userId === userId)
  }

  changeSocketId(userId, socketId) {
    const currentUserIndex = this.users.findIndex(user => user.userId === userId)

    this.users[currentUserIndex].socketId = socketId
  }

  remove(socketId) {
    const currentUser = this.users.find(user => user.socketId === socketId)

    if (currentUser) {
      this.users = this.users.filter(user => user.userId !== currentUser.userId)
    }

    return currentUser
  }
}

module.exports = () => {
  return new Users()
}
