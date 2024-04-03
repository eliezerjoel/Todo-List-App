const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Email is a required field'],
        unique: [true, 'User already exists with that email'],
        lowercase: true,
        validate:[isEmail, 'Please Enter a valid email'],
    },
    password:{
        type: String,
        required: [true,'Email is a required field'],
        minlength: [6, 'Password cannot be shorter than 6 Characters'],
    },

})

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
const User = mongoose.model('user', userSchema)


module.exports = User