const mongoose = require('mongoose');
const Usuario = require('./Usuario');
const Alojamiento = require('./Alojamiento');

const reservaSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: true
    }, 
    alojamiento: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Alojamiento',
        required: true
    }, 
    fecha: {
        type: Date, 
        unique: false, 
        required: true
    }, 
    precio:{
        type: Number,
        unique: false,
        required: true
    }
});

const Reserva = mongoose.model('Reserva', reservaSchema);
module.exports = Reserva;

