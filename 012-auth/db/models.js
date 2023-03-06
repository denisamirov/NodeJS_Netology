const {Schema, model} = require('mongoose')


const userSchema = new Schema({
    id: {
        type: String,
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = model('users', userSchema)