
// to store info in database



const BlogPost = require('../models/BlogPost.js')
const path = require('path') //for image file path


module.exports = (req, res, next) => {
   let image = req.files.image
   image.mv(path.resolve(__dirname, 'public/img', image.name), 
   async (error) => {
      await BlogPost.create({
         ...req.body,
         image: '/img/' + image.name,
         userid: req.session.userId
      })
      res.redirect('/')
   })
}