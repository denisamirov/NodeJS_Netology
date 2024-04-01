const {Schema, model} = require('mongoose')


const userSchema = new Schema({
    id: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = model('users', userSchema)