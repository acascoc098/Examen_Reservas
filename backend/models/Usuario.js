const mongoose = require('mongoose');
const usuarioSchema = mongoose.Schema({    
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
        type: Number, 
        unique: true, 
        required: true
    }, 
    email: {
        type: String, 
        unique: true, 
        required: true
    },
    username: {
        type: String, 
        unique: true, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String, 
        unique: false, 
        required: true
    }
});
const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;