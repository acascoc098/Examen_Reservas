const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Alojamiento = require('../models/Alojamiento');
const Usuario = require('../models/User');
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
        const alojamientos = await Alojamiento.find();
        const reservas = await Reserva.find({alojamiento: alojamiento._id}).
            populate('usuario').populate('alojamiento').exec();
        if (reservas && alojamiento) {
            res.render('reservas/alojamientos', 
                {
                    alojamiento: alojamiento,
                    reservas: reservas, 
                    alojamientos: alojamientos
                });
        } else {
            res.render('mensaje', {mensajePagina:'No encuentro ese alojamiento en la base de datos'});
        }
    } catch (error) {
        console.log(error);
        res.render('mensaje', {mensajePagina: 'Error al mostrar reservas para un alojamiento'});
    }

});

router.post('/alojamiento', async (req, res) => {
    try {
        const {usuario, year} = req.body;

        const alojamiento = await Alojamiento.findById(req.body.alojamiento); 
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
        if (reservas && usuario) {
            res.render('reservas/usuarios', 
                {
                    usuario: usuario,
                    reservas: reservas, 
                    usuarios: usuarios
                });
        } else {
            res.render('mensaje', {mensajePagina:'No encuentro ese usuario en la base de datos'});
        }
    } catch (error) {
        console.log(error);
        res.render('mensaje', {mensajePagina: 'Error al mostrar reservas para un usuario'});
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
            res.render('reservas/usuarios', 
            {
                usuario: usuario,
                reservas:reservas, 
                usuarios:usuarios
            });
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

// Editar reserva
router.get('/edit/:id', async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id);
        if (reserva) {
            res.render('reservas/edit', { reserva: reserva });
        } else {
            res.render('mensaje', { mensajePagina: 'No se encontró la reserva en la base de datos' });
        }
    } catch (error) {
        console.log(error);
        res.render('mensaje', { mensajePagina: 'Error al cargar la reserva para editar' });
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        const { nuevaFecha } = req.body;
        const reserva = await Reserva.findByIdAndUpdate(req.params.id, { fecha: nuevaFecha }, { new: true });
        
        if (reserva) {
            res.redirect('/reservas');
        } else {
            res.render('mensaje', { mensajePagina: 'No se encontró la reserva en la base de datos' });
        }
    } catch (error) {
        console.log(error);
        res.render('mensaje', { mensajePagina: 'Error al actualizar la reserva' });
    }
});


// Eliminar reserva
router.get('/delete/:id', async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id);
        if (reserva) {
            res.render('reservas/delete', { reserva: reserva });
        } else {
            res.render('mensaje', { mensajePagina: 'No se encontró la reserva en la base de datos' });
        }
    } catch (error) {
        console.log(error);
        res.render('mensaje', { mensajePagina: 'Error al cargar la reserva para eliminar' });
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        const reserva = await Reserva.findByIdAndDelete(req.params.id);
        if (reserva) {
            res.redirect('/reservas');
        } else {
            res.render('mensaje', { mensajePagina: 'No se encontró la reserva en la base de datos' });
        }
    } catch (error) {
        console.log(error);
        res.render('mensaje', { mensajePagina: 'Error al eliminar la reserva' });
    }
});


module.exports=router;