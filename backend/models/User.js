const mongoose = require('mongoose');
// Defino la estructura
const userSchema = mongoose.Schema(
    {
        username: {
            type: String, 
            unique: true, 
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        }
    },{
        statics: {
            findByEmail(email) {
                return find({email: email});
            }
        }
    });
// Equivalente a una clase modelo de Java
const User = mongoose.model('User', userSchema);

module.exports = User;
