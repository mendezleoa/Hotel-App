const router = require('express').Router()
const Reserva = require('../models/Reserva')

/* Esquemas de Validación */
const Joi = require('@hapi/joi')

const schemaReserva = Joi.object({
  habitacion: Joi.string().min(3).max(255).required()
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
    return res.status(400).json({ error: 'El Email está registrado' })
  }

  const reservacion = new Reserva({
    habitacion: req.body.habitacion,
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
