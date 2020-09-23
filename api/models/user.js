const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema({
  name: { type: String },
  surname: { type: String },
  sex: { type: String },
  birthday: { type: Number, default: '' },
  marital_status: { type: String, default: '' },
  hometown: { type: String, default: '' },
  languages: { type: Array, default: [] },
  grandparents: [{ type: Schema.ObjectId, ref: "User" }],
  parents: [{ type: Schema.ObjectId, ref: "User" }],
  brothers_sisters: [{ type: Schema.ObjectId, ref: "User" }],
  children: [{ type: Schema.ObjectId, ref: "User" }],
  grandchildren: [{ type: Schema.ObjectId, ref: "User" }],
  site: { type: String, default: '' },
  mobile_phone: { type: String, default: '' },
  additional_phone: { type: String, default: '' },
  skype: { type: String, default: '' },
  activity: { type: String, default: '' },
  interests: { type: String, default: '' },
  favourite_music: { type: String, default: '' },
  favourite_films: { type: String, default: '' },
  favourite_teleshow: { type: String, default: '' },
  favourite_books: { type: String, default: '' },
  favourite_quotes: { type: String, default: '' },
  about_me: { type: String, default: '' },
  friends: [{ type: Schema.ObjectId, ref: "User" }],
  email: { type: String },
  password: { type: String },
  photos: [{
    photo: { type: String },
    isAvatar: { type: Boolean, default: false }
  }],
  status: { type: String, default: '' },
  online: { type: String, default: '' }
},
{
  versionKey: false
})

module.exports = mongoose.model("User", userSchema);
