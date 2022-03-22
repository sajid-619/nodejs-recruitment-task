const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            throw new Error(err)
        }
        console.log('Database connected...')
    }
)