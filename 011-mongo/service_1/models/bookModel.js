const {Schema, model} = require('mongoose')


const bookSchema = new Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    authors: {
        type: String,
        default: "",
    },
    favourite: {
        type: String,
        default: "",
    },
    fileCover: {
        type: String,
        default: "",
    },
    fileName: {
        type: String,
        default: "",
    },
    fileBook: {
        type: String,
        default: "",
    },
})

module.exports = model('book', bookSchema)