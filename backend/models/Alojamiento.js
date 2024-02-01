const mongoose = require('mongoose');
const alojamientoSchema = mongoose.Schema({    
    nombre: {
        type: String, 
        unique: false, 
        required: true
    },
    telefono: {
        type: String, 
        unique: true, 
        required: true
    },
    direccion: {
        type: String, 
        unique: true, 
        required: true
    }
});
const Alojamiento = mongoose.model('Alojamiento', alojamientoSchema);
module.exports = Alojamiento;