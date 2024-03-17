const mongoose = require('mongoose')
const { Schema } = mongoose

const reservaSchema = mongoose.Schema(
  {
    //room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    //user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: String, required: true },
    roomid: { type: String, required: true },
    userid: { type: String, required: true },
    fechaentrada: { type: String, required: true },
    fechasalida: { type: String, required: true },
    totaldias: { type: Number, required: true },
    totalimporte: { type: Number, required: true },
    transactionid: { type: String, required: true },
    status: { type: String, required: true, default: 'Reservado' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Reserva', reservaSchema)
