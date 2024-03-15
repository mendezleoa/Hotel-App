const router = require('express').Router()
<<<<<<< HEAD
const Reserva = require('../models/Room')
const User = require('../models/User')
=======
const Room = require('../models/Room')
>>>>>>> Production

/* Esquemas de Validación */
const Joi = require('@hapi/joi').extend(require('@joi/date'))

<<<<<<< HEAD
const schemaReserva = Joi.object({
  room: Joi.string().min(3).max(255).required(),
  capacidad: Joi.number().min(1).max(10).required(),
  user: Joi.string().min(3).max(255).required(),
  fechaInit: Joi.date().format('YYYY-MM-DD').utc()
=======
const schemaRoom = Joi.object({
  descripcion: Joi.string().min(5).max(255).required(),
  comodidades: Joi.string().min(5).max(255).required(),
  capacidad: Joi.number().min(1).max(10).required(),
  tarifas: Joi.number().min(1).max(10).required(),
  review: Joi.string().min(3).max(255).required(),
  fechaInit: Joi.date().format('YYYY-MM-DD').utc().required(),
  imagenes: Joi.string().uri().allow(''),
  evaluacion: Joi.number().min(1).max(5).required()
})

router.get('/', async res => {
  try {
    const rooms = await Room.find()
    res.json({
      error: null,
      data: rooms
    })
  } catch (error) {
    res.status(400).json({ error })
  }
>>>>>>> Production
})

/* Ruta nuevo */
router.post('/new', async (req, res) => {
<<<<<<< HEAD
  const { error } = schemaReserva.validate(req.body)
=======
  const { error } = schemaRoom.validate(req.body)
>>>>>>> Production

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

<<<<<<< HEAD
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
    capacidad: req.body.capacidad,
    user: idUser._id,
    fechaInit: req.body.fechaInit
  })

  try {
    const savedReserva = await reservacion.save()
=======
  const room = new Room({
    descripcion: req.body.descripcion,
    comodidades: req.body.comodidades,
    capacidad: req.body.capacidad,
    tarifas: req.body.tarifas,
    review: req.body.review,
    imagenes: req.body.imagenes,
    evaluacion: req.body.evaluacion
  })

  try {
    const savedReserva = await room.save()
>>>>>>> Production
    res.json({
      error: null,
      data: savedReserva
    })
  } catch (error) {
    res.status(400).json({ error })
  }
})
<<<<<<< HEAD
router.delete('/delete/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const deletedReserva = await Reserva.deleteOne({ _id: req.params.id })
    res.json({
      error: null,
      data: deletedReserva
=======

router.put('/update', async (req, res) => {
  const { error } = schemaRoom.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }
  try {
    const updateRoom = await Room.findOneAndUpdate(
      { _id: req.body._id },
      {
        descripcion: req.body.descripcion,
        comodidades: req.body.comodidades,
        capacidad: req.body.capacidad,
        tarifas: req.body.tarifas,
        review: req.body.review,
        imagenes: req.body.imagenes,
        evaluacion: req.body.evaluacion
      },
      { new: true }
    )
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedRoom = await Room.deleteOne({ _id: req.params.id })
    res.json({
      error: null,
      data: deletedRoom
>>>>>>> Production
    })
  } catch (error) {
    res.status(400).json({ error })
  }
})

module.exports = router
