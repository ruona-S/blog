
// user password authentication and sessions

const bcrypt = require('bcrypt')
const User = require('../models/user.js')




module.exports = (req, res) => {
   const { username, password } = req.body
   User.findOne({username:username}, (error, user) => {
      if(user) { // if username matches one in the database
         bcrypt.compare(password, user.password, (error, same) => {
            if (same) { //if passwords match
               req.session.userId = user._id
               res.redirect('/') // store session
            } else {
               res.redirect('/auth/login')
            }
         })
      } else {
         res.redirect('/auth/login')
      }
   })
}

