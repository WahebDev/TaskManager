const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    }
    ,
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Invalid password')
            }
        }
    }
})

userSchema.pre('save',async function(next){
    const user = this
    
    if (user.isModified('password')) { // True if a new user is created, or an existing user is updated !
        user.password = await bcrypt.hash(user.password,8)
    }
    
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User

