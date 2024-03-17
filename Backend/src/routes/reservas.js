const router = require('express').Router()
const moment = require('moment'); 

const Reserva = require('../models/Reserva')
const User = require('../models/User')
const Room = require('../models/Room')

const jwt = require('jsonwebtoken')
/* Esquemas de Validación */
const Joi = require('@hapi/joi').extend(require('@joi/date'))

const schemaReserva = Joi.object({
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

  console.log("Entro",req.body.fechaSalida);
  //const { error } = schemaReserva.validate(req.body)

  error = null
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  const fechaInitISO = moment(req.body.fechaInit,"DD-MM-YYYY")
  const fechaSalidaISO = moment(req.body.fechaSalida,"DD-MM-YYYY")
    
  const idUser = await User.findById(req.user)
  const idRoom = await Room.findById(req.body.room)
  /*
  
  if (!idUser || !idRoom) {
    return res
      .status(400)
      .json({ error: 'Datos de usuario o habitación no válidos' })
  }
*/
  const reservacion = new Reserva({
    room: idRoom,
    user: idUser,
    fechaInit: fechaInitISO,
    fechaSalida: fechaSalidaISO,
    totalimporte: req.body.totalimporte
  })
  console.log("Salio");
  console.log("reservacionRutas",reservacion)
  try {
    const savedReserva = await reservacion.save()
    console.log("save",savedReserva)
    idUser.reservas.push(savedReserva)
    await idUser.save()

    return res.json({
      error: null,
      data: savedReserva
    })
  } catch (error) {
    console.log("Esave",error)
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
