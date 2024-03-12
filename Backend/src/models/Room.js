const mongoose = require('mongoose')
const { Schema } = mongoose

const roomSchema = mongoose.Schema({
  descripcion: {
    type: String,
    min: 3,
    max: 255,
    default: 'n/a'
  },
  comodidades: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  imagenes: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  tarifas: {
    type: Number,
    required: true,
    min: 1,
    max: 5000
  },
  review: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  evaluacion: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
})

module.exports = mongoose.model('Reserva', roomSchema)
