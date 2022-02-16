const User = require('../models/user')

module.exports = (req, res, next) => {
   User.findById(req.session.userId, (error, user) => {
      if(error || !user) {
         return res.redirect('/') // redirect back to the homepage is there is an error or if user doesn't exist
      }
      next()
   })
}