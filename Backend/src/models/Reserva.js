const mongoose = require('mongoose')
const { Schema } = mongoose

const reservaSchema = mongoose.Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fechaInit: { type: String, required: true },
    fechaSalida: { type: String, required: true },
    totalimporte: { type: Number, required: true },
    status: { type: Boolean, required: true, default: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Reserva', reservaSchema)
