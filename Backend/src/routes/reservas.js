const router = require('express').Router()
const Reserva = require('../models/Reserva')
const User = require('../models/User')

const jwt = require('jsonwebtoken')
/* Esquemas de Validación */
const Joi = require('@hapi/joi').extend(require('@joi/date'))

const schemaReserva = Joi.object({
  room: Joi.string().min(3).max(255).required(),
  fechaInit: Joi.date().format('DD-MM-YYYY').utc(),
  fechaSalida: Joi.date().format('DD-MM-YYYY').utc(),
  totalimporte: Joi.number().required()
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

/* Ruta nuevo */
router.post('/new', decodeToken, async (req, res) => {
  const { error } = schemaReserva.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  const idUser = await User.findOne({ _id: req.user })
  if (!idUser) {
    return res.status(400).json({ error: 'Datos de usuario no validos' })
  }

  const reservacion = new Reserva({
    room: req.body.room,
    user: req.user,
    fechaInit: req.body.fechaInit,
    fechaSalida: req.body.fechaSalida,
    totalimporte: req.body.totalimporte
  })
  try {
    const savedReserva = await reservacion.save()
    idUser.reservas.push(savedReserva)
    await idUser.save()

    return res.json({
      error: null,
      data: savedReserva
    })
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedReserva = await Reserva.deleteOne({ _id: req.params.id })
    res.json({
      error: null,
      data: deletedReserva
    })
  } catch (error) {
    res.status(400).json({ error })
  }
})

module.exports = router
