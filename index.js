const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const mongoose  = require('mongoose')
//const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload')
//const User = require('./models/user.js')
//const bcrypt = require('bcrypt')
const expressSession = require('express-session')
const flash = require('connect-flash')   // to remove error messages so that they are not permanently saved in the session

const host = '0.0.0.0';
const port = process.env.PORT || 8080;


mongoose.connect('mongodb+srv://<Sonia>:<myunconditionalloveforluffy>@cluster0.ftr9a.mongodb.net/blog_database', {
   useNewUrlParser: true
})

app.set('view engine', 'ejs')

const validationMiddleware = require('./middleware/validationMiddleware')

const userAuthMiddleware = require('./middleware/userAuthMiddleware')

const alreadyAuthenticatedMiddleware = require('./middleware/alreadyAuthenticatedMiddleware')

global.loggedIn = null  // *


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
   extended: false
}))
app.use(fileUpload())
app.use('/posts/store', validationMiddleware)
app.use(expressSession({
   secret: 'luffy is king of the pirates',
   resave: true,
   saveUninitialized: true
}))
app.use('*', (req, res, next) => {
   loggedIn = req.session.userId

})
app.use(flash())



const homeController = require('./controllers/home')
const newPostController = require('./controllers/newPost')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/store')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

app.get('/', homeController)
app.get('/posts/new', userAuthMiddleware, newPostController )
app.get('/post/:id', getPostController)
app.post('/posts/store', userAuthMiddleware, storePostController)
//post
app.get('/auth/register', alreadyAuthenticatedMiddleware, newUserController)
app.post('/users/register', alreadyAuthenticatedMiddleware, storeUserController)
//login
app.get('/auth/login', alreadyAuthenticatedMiddleware, loginController)
app.post('/users/login', alreadyAuthenticatedMiddleware, loginUserController)
//logout
app.get('/auth/logout', logoutController)

app.use((req,res) => res.render(notfound))


let port = process.env.PORT
if (port ==null || port =='') {
   port = 4000
}
app.listen(4000, () => {
   console.log('App is listening on port 4000')
})
