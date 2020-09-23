const mongoose = require('mongoose')
const { Schema } = mongoose


const chatSchema = new Schema({
  participants: { type: Array },
  messages: [{
    from: String,
    to: String,
    date: Number,
    text: String
  }],
  lastMessage: {
    from: String,
    to: String,
    date: Number,
    text: String
  }
},
{
  versionKey: false
})

module.exports = mongoose.model("Chat", chatSchema);
