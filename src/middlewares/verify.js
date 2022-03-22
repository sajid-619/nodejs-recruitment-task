const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const { authorization } = req.headers
    const { JWT_SECRET } = process.env

    if (!authorization) {
        return res.status(400).json({
            error: 'no token',
        })
    }

    const token = authorization.split(' ')[1]

    await jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(400).json({
                error: 'invalid token',
            })
        }
        req.user = decoded
        next()
    })
}