const mongoose = require('mongoose')
const config = require('config')

const connectionString = config.get('mongoUrl')

const setUpConnection = () => {
  mongoose.connect(connectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
    .then(() => mongoose.connection)
    .catch(error => console.log(error))
}

module.exports = {
  setUpConnection
}
