const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    Title: String,
    Released: Date,
    Genre: String,
    Director: String,
    author: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = new mongoose.model('movie', movieSchema)