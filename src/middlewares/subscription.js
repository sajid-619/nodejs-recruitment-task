const Movie = require('../db/models/Movies')

module.exports = async (req, res, next) => {
    const { userId, role } = req.user

    if (role === 'basic') {
        const userMovies = await Movie.find({ author: userId })
        const currentMonth = new Date().getMonth()
        const moviesThisMonth = userMovies.filter((movie) => {
            const createdAt = new Date(movie.createdAt)
            return createdAt.getMonth() === currentMonth
        })
        if (moviesThisMonth.length >= 5) {
            return res.status(400).json({
                message:
                    'You reached maximum amount of movies you can add, upgrade your account to premium to get unlimited movies',
            })
        }
    }
    next()
}