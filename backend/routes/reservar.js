const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Alojamiento = require('../models/Alojamiento');
const Usuario = require('../models/Usuario');
const Reserva = require('../models/Reserva');

// muestra en una tabla la lista de reservas de un usuario
router.get('/', async(req, res) => {
    const reservas = await Reserva.find({usuario: req.session.user._id}).
        populate('usuario').populate('alojamiento').exec();
    console.log(reservas);
    res.render('reservar/index', {reservas: reservas})
});

// muestra el formulario alta reserva
router.get('/create', async (req, res) =>{
    const alojamientos = await Alojamiento.find();
    res.render('reservar/create', {alojamientos: alojamientos});
});

// guarda la reserva en la BBDD
router.post('/create', async (req, res) =>{
    const datosReserva = req.body;
    
    const alojamiento = await Alojamiento.findById(datosReserva.alojamiento);

    if (alojamiento) {
        const reserva = new Reserva({
            usuario: req.session.user._id,
            alojamiento: alojamiento._id,
            fecha: datosReserva.fecha,
            precio: alojamiento.precio
        });
    
        try {
            await reserva.save();
            res.redirect('/reservar');
        } catch (error) {
            console.log(error);
            res.render('mensaje', {mensajePagina: 'ERROR: ' + 
                'No se ha podido completar la reserva para el usuario.'})
        }
    }else {
        res.render('mensaje', {mensajePagina: 'ERROR: ' + 
                'No se ha podido completar la reserva para el alojamiento indicado.'})
    }
    
});

module.exports=router;
