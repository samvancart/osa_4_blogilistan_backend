const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('./utils/logger')

logger.info('connecting to', config.mongoUrl)

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
    .then(result => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

    // app.use(express.static('build'))
    app.use(bodyParser.json())
    app.use(cors())
    app.use(middleware.reqLogger)

    app.use('/api/blogs', blogsRouter)


module.exports = app