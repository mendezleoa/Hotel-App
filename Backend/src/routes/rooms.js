const router = require('express').Router()
const Room = require('../models/Room')
const User = require('../models/User')

const multer = require('multer')

const jwt = require('jsonwebtoken')
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

/* Almacenado de imagen */
const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now + '-' + file.originalname)
  }
})

const upload = multer({
  storage: Storage
}).single('imgFile')

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
    const rooms = await Room.find()
    return res.json({ rooms })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findOne({ _id: req.params.id })
    return res.json({ room })
  } catch (error) {
    return res.status(400).json({ message: error })
  }
})

/* Ruta nuevo */
router.post('/new', decodeToken, async (req, res) => {
  const { error } = schemaRoom.validate(req.body)

  const userAdmin = await User.findOne({ _id: req.user })
  if (!userAdmin.rol) {
    return res.status(400).json({ error: 'El usuario no es admin' })
  }
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  const existRoom = await Room.findOne({ name: req.body.name })
  if (existRoom) {
    return res.status(400).json({ error: 'Ya existe esta Habitación' })
  }

  const room = new Room({
    name: req.body.name,
    descripcion: req.body.descripcion,
    comodidades: req.body.comodidades,
    capacidad: req.body.capacidad,
    tarifas: req.body.tarifas,
    review: req.body.review,
    evaluacion: req.body.evaluacion,
    imagen: {
      data: req.file.filename,
      contentType: 'image/jpg'
    }
  })

  try {
    const savedRoom = await room.save()
    return res.json({
      error: null,
      data: savedRoom
    })
  } catch (error) {
    return res.status(400).json({ error })
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
