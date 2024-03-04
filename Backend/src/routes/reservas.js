const router = require('express').Router()
const Reserva = require('../models/Reserva')
const User = require('../models/User')

/* Esquemas de Validación */
const Joi = require('@hapi/joi').extend(require('@joi/date'))

const schemaReserva = Joi.object({
  habitacion: Joi.string().min(3).max(255).required(),
  capacidad: Joi.number().min(1).max(10).required(),
  user: Joi.string().min(3).max(255).required(),
  fechaInit: Joi.date().format('YYYY-MM-DD').utc()
})

/* Ruta nuevo */
router.post('/new', async (req, res) => {
  const { error } = schemaReserva.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  /* Comprobar que la habitación este disponible para registrar reservacion del hotel */
  const isHabitacionExist = await Reserva.findOne({
    habitacion: req.body.habitacion
  })
  if (isHabitacionExist) {
    return res.status(400).json({ error: 'La habitacion está reservada' })
  }

  const idUser = await User.findOne({ username: req.body.user })

  const reservacion = new Reserva({
    habitacion: req.body.habitacion,
    capacidad: req.body.capacidad,
    user: idUser._id,
    fechaInit: req.body.fechaInit
  })

  try {
    const savedReserva = await reservacion.save()
    res.json({
      error: null,
      data: savedReserva
    })
  } catch (error) {
    res.status(400).json({ error })
  }
})

module.exports = router
