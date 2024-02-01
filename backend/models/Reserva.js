const mongoose = require('mongoose');
const reservaSchema = mongoose.Schema({    
    cliente: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cliente',
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
});
const Reserva = mongoose.model('Reserva', reservaSchema);
module.exports = Reserva;
