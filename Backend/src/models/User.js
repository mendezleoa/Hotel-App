const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  reservas: { type: Schema.Types.ObjectId, ref: 'Reserva' },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)
