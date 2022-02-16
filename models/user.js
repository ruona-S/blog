const mongoose = require('mongoose')
const Schema = mongoose.Schema

var mongooseUniqueValidator = require('mongoose-unique-validator') //to avoid crash when a non-unique username is used to register

const bcrypt = require('bcrypt')

const UserSchema = new Schema ({
   username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true
   },
   password: {
      type: String,
      required: [true, 'Password is required'],
   }
})

UserSchema.plugin(mongooseUniqueValidator)

UserSchema.pre('save', function(next) {
   const user = this

   bcrypt.hash(user.password, 10, (error, hash) => {
      user.password = hash
      next()
   })
})

const User = mongoose.model('User', UserSchema)

module.exports = User