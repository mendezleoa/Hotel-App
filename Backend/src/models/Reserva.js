const mongoose = require('mongoose')
const { Schema } = mongoose

const reservaSchema = mongoose.Schema({
  habitacion: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  capacidad: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  fechaInit: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Reserva', reservaSchema)
