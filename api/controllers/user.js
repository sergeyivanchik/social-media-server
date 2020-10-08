const mongoose = require('mongoose')
User = mongoose.model('User')


// const signup = async (req, res) => {
//   if (!req.body.username || !req.body.password) {
//     res.json({ message: 'Please pass username and password.' });
//   } else {
//     const user = await User.findOne({ username: req.body.username });
//     if (user) {
//       return res.status(500).json({ error: "User already exists." });
//     } else {
//       const newUser = new User({
//         username: req.body.username,
//         password: service.createHash(req.body.password),
//         email: req.body.email
//       });
//       await newUser.save()
//         .then(user => res.send(user))
//         .catch(error => {
//           res.status(500).send({
//             message: error.message
//           });
//           res.send(error);
//         })
//     }
//   }
// };

const setUser = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    surname: req.body.surname,
    sex: req.body.sex,
    birthday: req.body.birthday,
    marital_status: req.body.marital_status,
    hometown: req.body.hometown
  })
  await newUser.save()
    .then(user => res.send(user))
    .catch(error => {
      res.status(500).send({
        message: error.message
      })
      res.send(error)
    })
}

const getUser = async (req, res) => {
  await User.findById(req.params.id)
    .populate('friends')
    .populate('chats')
    .populate('incomingFriendRequests')
    .populate('outgoingFriendRequests')
    .then(user => res.send(user))
    .catch(error => {
      res.status(500).send({
        message: error.message
      })
      res.send(error)
    });
}

const changeOnline = async (data) => {
  return await User.updateOne({ _id: data.userId }, { online: data.online })
  .then(user => user)
  .catch(error => console.log(error))
}



// const login = async (req, res) => {
//   const user = await User.findOne({ username: req.body.username });
//   if (!user || !service.isValidPassword(user, req.body.password)) {
//     res.status(401).send({ message: 'Wrong username or password.' });
//   } else {
//     req.body.token = service.createToken(user.id);
//     res.json({ token: req.body.token, username: req.body.username, id: user.id });
//   }
// }

// const checkUser = async (req, res) => {
//   await User.findById(req.user.id)
//     .then(user => res.send({ id: user.id, username: user.username, avatar: user.avatar }))
//     .catch(error => {
//       res.status(500).send({
//         message: error.message
//       });
//     });
// };

// getToken = headers =>
//   headers && headers.authorization ? headers.authorization : null;

module.exports = {
  setUser,
  getUser,
  changeOnline,
  // signup,
  // login,
  // getToken,
  // checkUser
}
