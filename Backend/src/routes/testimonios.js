const router = require('express').Router()
const Testimonio = require('./models/Testimonio')

const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi')

// Middleware para decodificar el token y agregar el usuario al testimonio
const decodeToken = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    const decoded = jwt.verify(token, 'secretKey')
    req.user = decoded.user._id
    next()
  } else {
    res.status(401).json({ message: 'Token no válido' })
  }
}

// Esquema de validación de testimonio
const testimonioSchema = Joi.object({
  contenido: Joi.string().required(),
  valoracion: Joi.number().min(0).max(5).allow(null)
})

// Crear un testimonio
router.post('/new', decodeToken, async (req, res) => {
  try {
    const { error } = testimonioSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const { contenido, valoracion } = req.body
    const newTestimonio = new Testimonio({
      contenido,
      usuario: req.user,
      valoracion
    })

    const savedTestimonio = await newTestimonio.save()
    res.json(savedTestimonio)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
