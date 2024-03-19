const router = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

const jwt = require('jsonwebtoken')

const Joi = require('@hapi/joi').extend(require('@joi/date'))

const schemaBlog = Joi.object({
  mensaje: Joi.string().min(5).max(150).required()
})

const decodeToken = (req, res, next) => {
  const token = req.header('auth-token')
  if (token) {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = decoded._id
    next()
  } else {
    res.status(401).json({ message: 'Token no válido' })
  }
}

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find()
    return res.json({ blogs })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
})

router.post('/new', decodeToken, async (req, res) => {
  const { error } = schemaBlog.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  const existUser = await User.findOne({ _id: req.user })
  if (!existUser) {
    return res.status(400).json({ error: 'No existe el usuario' })
  }

  const newBlog = new Blog({
    user: existUser._id,
    mensaje: req.body.mensaje
  })

  try {
    const savedBlog = await newBlog.save()
    return res.json({
      error: null,
      data: savedBlog
    })
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedBlog = await Blog.deleteOne({ _id: req.params.id })
      res.json({
        error: null,
        data: deletedBlog
      })
    } catch (error) {
      res.status(400).json({ error })
    }
  })

module.exports = router
