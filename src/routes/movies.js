const router = require('express').Router()
const axios = require('axios')
const verify = require('../middlewares/verify')
const subscription = require('../middlewares/subscription')
const Movie = require('../db/models/Movies')

router.post('/', verify, subscription, async (req, res) => {
    const { query } = req.body
    const { userId } = req.user

    const {
        data: { Title, Released, Director, Genre },
    } = await axios.get(
        `http://www.omdbapi.com/?i=tt3896198&apikey=96680d56&t=${query}&type=movie`
    )

    if (!Title || !Released || !Director || !Genre) {
        res.status(400).json({
            error: 'Movie not found',
        })
    }

    const movie = new Movie({
        Title,
        Released: new Date(Date.parse(Released)),
        Genre,
        Director,
    })

    movie
        .save()
        .then((response) => {
            res.status(201).json(response)
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
            })
        })
})

router.get('/', verify, async (req, res) => {
    const { userId } = req.user

    const moviesList = await Movie.find({ author: userId })

    if (moviesList.length === 0) {
        res.status(200).json({
            message: 'No movies found',
        })
    }

    res.status(200).json(moviesList)
})

module.exports = router