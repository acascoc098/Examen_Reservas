const mongoose = require('mongoose');
const clienteSchema = mongoose.Schema({    
    nombre: {
        type: String, 
        unique: false, 
        required: true
    }, 
    apellido: {
        type: String, 
        unique: false, 
        required: true
    }, 
    telefono: {
        type: String, 
        unique: true, 
        required: true
    }, 
    email: {
        type: String, 
        unique: true, 
        required: true
    }/*,
    rol: {
        type: Boolean,
        unique: true,
        required: true
    }*/
});
const Cliente = mongoose.model('Cliente', clienteSchema);
module.exports = Cliente;
