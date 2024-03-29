const mongoose = require('mongoose')
const { Schema } = mongoose

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
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
    capacidad: {
      type: Number,
      required: true
    },
    type: {
      type: String
    },
    tarifas: {
      type: Number,
      required: true
    },
    reviews: [],
    evaluacion: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    imagen: {
      data: Buffer,
      contentType: String
    },
    currentBooking: []
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Room', roomSchema)
