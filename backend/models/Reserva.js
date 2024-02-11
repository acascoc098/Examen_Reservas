const mongoose = require('mongoose');
const reservaSchema = mongoose.Schema({    
    usuario: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }, 
    alojamiento: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Alojamiento',
        required: true
    }, 
    fecha: {
        type: String, 
        unique: true, 
        required: true
    }
    , 
    precio:{
        type: Number,
        unique: false,
        required: true
    }
});
const Reserva = mongoose.model('Reserva', reservaSchema);
module.exports = Reserva;
