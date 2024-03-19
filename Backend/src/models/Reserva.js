const mongoose = require('mongoose')
const { Schema } = mongoose

const reservaSchema = new Schema(
  {
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fechaInit: { type: Date, required: true },
    fechaSalida: { type: Date, required: true },
    totalimporte: { type: Number, required: true, min: 0 },
    status: { type: Boolean, required: true, default: true }
  },
  {
    timestamps: true
  }
)

//reservaSchema.index({ room: 1, fechaInit: 1 })

module.exports = mongoose.model('Reserva', reservaSchema)
