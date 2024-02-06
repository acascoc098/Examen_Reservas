const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Alojamiento = require('../models/Alojamiento');
const Usuario = require('../models/Usuario');
const Reserva = require('../models/Reserva');

router.get('/', async (req, res) =>{
    try {
        const reservas = await Reserva.find().
            populate('alojamiento').
            populate('usuario').
            exec();
        //console.log(reservas);
        res.render('reservas/index', {reservas: reservas});
    } catch (error) {
        console.log(error);
    }
});

// Ver las reservas para el alojamiento con ID=id
router.get('/alojamiento/:id', async (req, res) => {
    try {
        const alojamiento = await Alojamiento.findById(req.params.id);
        const usuarios = await Usuario.find();
        if (alojamiento && usuarios)
            res.render('reservas/reserva', {
                alojamiento: alojamiento,
                usuarios: usuarios
            });
        else
            res.render('mensaje', {mensajePagina:'No encuentro esa alojamiento en la base de datos'});
    } catch (error) {
        console.log(error);
        res.render('mensaje', {mensajePagina: 'Error al reservar de alojamiento'});

    }

});

router.post('/alojamiento/:id', async (req, res) => {
    try {
        const {usuario, year} = req.body;

        const alojamiento = await Alojamiento.findById(req.params.id); 
        const usuarioMongo = await Usuario.findById(usuario);
        
        if(alojamiento && usuarioMongo) {
            const reserva = new Reserva({
                usuario: usuarioMongo._id,
                alojamiento: alojamiento._id,
                año: year                
            });
            await reserva.save();            
        } else {
            res.render('mensaje', {mensajePagina: 'Error al intentar reservar de una alojamiento'});
        }
        
    } catch (error){
        console.log(error);
        res.render('mensaje', {mensajePagina: 'Error al intentar reservar en alojamiento'});
    }   
    res.redirect('/reservas/alojamiento/'+req.params.id); 
});


// Ver las reservas para el usuario con ID = id
router.get('/usuario/:id', async (req, res) => {
    try {        
        const usuario = await Usuario.findById(req.params.id);
        const usuarios = await Usuario.find();
        const reservas = await Reserva.find({usuario: usuario._id}).
            populate('usuario').populate('alojamiento').exec();
        if (reservas && usuarios) {
            res.render('reservas/usuarios', {reservas:reservas, usuarios:usuarios});
        } else {
            res.render('mensaje', {mensajePagina:'No encuentro ese alojamiento en la base de datos'});
        }
    } catch (error) {
        console.log(error);
        res.render('mensaje', {mensajePagina: 'Error al reservar de alojamiento'});
    }

});

// Ver las reservas para el usuario con ID = id
router.post('/usuario', async (req, res) => {
    try {        
        const usuario = await Usuario.findById(req.body.usuario);
        const usuarios = await Usuario.find();
        const reservas = await Reserva.find({usuario: usuario._id}).
            populate('usuario').populate('alojamiento').exec();
        if (reservas && usuario) {
            res.render('reservas/usuarios', {reservas:reservas, usuarios:usuarios});
        } else {
            res.render('mensaje', {mensajePagina:'No encuentro esa alojamiento en la base de datos'});
        }
    } catch (error) {
        console.log(error);
        res.render('mensaje', {mensajePagina: 'Error al reservar de alojamiento'});
    }

});

// Ver las reservas para el usuario con ID = id
router.get('/create', async (req, res) => {
    try {
        const alojamientos = await Alojamiento.find();
        const usuarios = await Usuario.find();
        if (alojamientos && usuarios) {
            res.render('reservas/create', {
                alojamientos: alojamientos,
                usuarios: usuarios
            });
        } else {
            res.render('mensaje', {mensajePagina:'No encuentro alojamientos o clientes base de datos'});
        }
    } catch (error) {
        console.log(error);
        res.render('mensaje', {mensajePagina: 'Error al reservar de alojamiento'});
    }

});


// guarda la reserva en la BBDD
router.post('/create', async (req, res) =>{
    const datosReserva = req.body;
    
    const alojamiento = await Alojamiento.findById(datosReserva.alojamiento);
    const usuario = await Usuario.findById(datosReserva.usuario)

    if (alojamiento && usuario) {
        const reserva = new Reserva({
            usuario: usuario._id,
            alojamiento: alojamiento._id,
            fecha: datosReserva.fecha,
            precio: alojamiento.precio
        });
    
        try {
            await reserva.save();
            res.redirect('/reservas');
        } catch (error) {
            console.log(error);
            res.render('mensaje', {mensajePagina: 'ERROR: ' + 
                'No se ha podido completar la reserva para el usuario y alojamiento indicados.'})
        }
    }else {
        res.render('mensaje', {mensajePagina: 'ERROR: ' + 
                'No se ha podido encontrar el usuario o el alojamiento en la base de datos.'})
    }
    
});


module.exports=router;