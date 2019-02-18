const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response, next) => {
        const users = await User
            .find({}).populate('blogs', { title: 1, author: 1, url: 1 })

        response.json(users.map(user => user.toJSON()))

})


usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        const blog = await Blog.findById(body.blogId)

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
            blog: blog._id
        })

        const savedUser = await user.save()
        blog.user = blog.user.concat(savedUser._id)
        await blog.save()
        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter
