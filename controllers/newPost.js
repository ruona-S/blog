module.exports = (req, res) => {
   if(req.session.userId) {
      return res.render('create', {
         createPost: true  // only load summernote scripts when new posts page is clicked
      })
   }
   res.redirect('/auth/login')
}