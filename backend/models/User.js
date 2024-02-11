const mongoose = require('mongoose');
// Defino la estructura
const userSchema = mongoose.Schema(
    {
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
// Equivalente a una clase modelo de Java
const User = mongoose.model('User', userSchema);

module.exports = User;
