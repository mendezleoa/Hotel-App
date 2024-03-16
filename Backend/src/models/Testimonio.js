const mongoose = require('mongoose');

const testimonioSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  valoracion: {
    type: Number,
    min: 0,
    max: 5,
    default: undefined
  }
});

const Testimonio = mongoose.model('Testimonio', testimonioSchema);

module.exports = Testimonio;