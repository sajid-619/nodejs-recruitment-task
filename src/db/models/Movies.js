const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    Title: String,
    Released: Date,
    Genre: String,
    Director: String,
})

module.exports = new mongoose.model('movie', movieSchema)