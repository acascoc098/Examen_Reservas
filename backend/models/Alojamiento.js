const mongoose = require('mongoose');
const alojamientoSchema = mongoose.Schema({    
    nombre: {
        type: String, 
        unique: true, 
        required: true
    }, 
    ciudad: {
        type: String, 
        unique: false, 
        required: true
    }, 
    tipo: {
        type: String, 
        unique: false, 
        required: true
    },
    precio: {
        type: Number,
        unique: false,
        required: true
    }
});
const Alojamiento = mongoose.model('Alojamiento', alojamientoSchema);
module.exports = Alojamiento;