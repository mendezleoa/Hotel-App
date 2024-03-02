const mongoose = require('mongoose');

const reservaSchema = mongoose.Schema({
    habitacion: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Reserva', reservaSchema);