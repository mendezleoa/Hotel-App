const router = require('express').Router()
const Reserva = require('../models/Reserva')
const User = require('../models/User')

/* Esquemas de Validación */
const Joi = require('@hapi/joi').extend(require('@joi/date'))

const schemaReserva = Joi.object({
  room: Joi.string().min(3).max(255).required(),
<<<<<<< HEAD
  capacidad: Joi.number().min(1).max(10).required(),
=======
>>>>>>> Production
  user: Joi.string().min(3).max(255).required(),
  fechaInit: Joi.date().format('YYYY-MM-DD').utc(),
  fechaSalida: Joi.date().format('YYYY-MM-DD').utc()
})

/* Ruta nuevo */
router.post('/new', async (req, res) => {
  const { error } = schemaReserva.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  /* Comprobar que la habitación este disponible para registrar reservacion del hotel */
  const isHabitacionExist = await Reserva.findOne({
    room: req.body.room
  })
  if (isHabitacionExist) {
    return res.status(400).json({ error: 'La habitacion está reservada' })
  }

  const idUser = await User.findOne({ username: req.body.user })
  if (!idUser) {
    return res.status(400).json({ error: 'Datos de usuario no validos' })
  }

  const reservacion = new Reserva({
    room: req.body.room,
<<<<<<< HEAD
    capacidad: req.body.capacidad,
=======
>>>>>>> Production
    user: idUser._id,
    fechaInit: req.body.fechaInit,
    fechaSalida: req.body.fechaSalida
  })
  try {
    const savedReserva = await reservacion.save()
    idUser.reservas.push(savedReserva)
    await idUser.save()

    res.json({
      error: null,
      data: savedReserva
    })
  } catch (error) {
    res.status(400).json({ error })
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
