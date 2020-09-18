const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema({
  name: { type: String },
  surname: { type: String },
  sex: { type: String },
  birthday: { type: Number },
  marital_status: { type: String },
  hometown: { type: String },
  languages: { type: Array, default: [] },
  grandparents: [{type: Schema.ObjectId, ref: "User"}],
  parents: [{type: Schema.ObjectId, ref: "User"}],
  brothers_sisters: [{type: Schema.ObjectId, ref: "User"}],
  children: [{type: Schema.ObjectId, ref: "User"}],
  grandchildren: [{type: Schema.ObjectId, ref: "User"}],
  site: { type: String },
  mobile_phone: { type: String },
  additional_phone: { type: String },
  skype: { type: String },
  activity: { type: String },
  interests: { type: String },
  favourite_music: { type: String },
  favourite_teleshow: { type: String },
  favourite_books: { type: String },
  favourite_quotes: { type: String },
  about_me: { type: String },
  friends: [{type: Schema.ObjectId, ref: "User"}],
  email: { type: String },
  password: { type: String },
  photos: [{
    photo: { type: String },
    isAvatar: { type: Boolean, default: false }
  }],
  status: { type: String }
},
{
  versionKey: false
})

module.exports = mongoose.model("User", userSchema);
