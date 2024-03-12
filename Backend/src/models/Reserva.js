const mongoose = require('mongoose')
const { Schema } = mongoose

const reservaSchema = mongoose.Schema({
  room: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  capacidad: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
