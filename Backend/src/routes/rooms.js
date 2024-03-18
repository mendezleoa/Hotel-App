const router = require('express').Router()
const Room = require('../models/Room')

/* Esquemas de Validación */
const Joi = require('@hapi/joi').extend(require('@joi/date'))

const schemaRoom = Joi.object({
  name: Joi.string().min(5).max(255).required(),
  descripcion: Joi.string().min(5).max(255).required(),
  type: Joi.string().min(3).max(255).required(),
  capacidad: Joi.number().min(1).max(10).required(),
  tarifas: Joi.number().min(1).max(255).required(),
  evaluacion: Joi.number().min(1).max(10).required(),
  comodidades: Joi.string().min(5).max(255).required()
})

router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find()
    return res.json({ rooms })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findOne({_id: req.params.id})
    return res.json({ room })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
})

/* Ruta nuevo */
router.post('/new', async (req, res) => {
  const { error } = schemaRoom.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

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
    const savedRoom = await room.save()
    res.json({
      error: null,
      data: savedRoom
    })
  } catch (error) {
    res.status(400).json({ error })
  }
})

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
    res.json({
      error: null,
      data: updateRoom
    })
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
    })
  } catch (error) {
    res.status(400).json({ error })
  }
})

module.exports = router
