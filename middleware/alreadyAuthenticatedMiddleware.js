


module.exports = (req, res, next) => {
   if(req.session.userId) { // if user id is already in session (logged in)
      return res.redirect('/')
   }
   next()
}