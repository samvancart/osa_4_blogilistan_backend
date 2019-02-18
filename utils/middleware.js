
const morgan = require('morgan')
const logger = require('./logger')

morgan.token('body', function getContent(req, res) { return JSON.stringify(req.body) })

const reqLogger = morgan(
    ':method :url :status :res[content-length] - :response-time ms :body')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({
            error: 'malformatted id'
        })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({
            error: error.message
        })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }
    logger.error(error.message)

    next(error)
}


module.exports = {
    reqLogger,
    unknownEndpoint,
    errorHandler
}