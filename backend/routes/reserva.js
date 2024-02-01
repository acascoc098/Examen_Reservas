const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Alojamiento = require('../models/Alojamiento');
const Cliente = require('../models/Cliente');
const Reserva = require('../models/Reserva');

router.get('/', async (req, res) =>{
    try {
        const reservas = await Reserva.find().
            populate('alojamiento').
            populate('cliente').
            exec();
        res.render('reservas/index', {reservas: reservas});
    } catch (error) {
        console.log(error);
    }
});

router.get('/alojamiento/:id', async (req, res) => {
    try {
        const alojamiento = await Alojamiento.findById(req.params.id);
        const clientes = await Cliente.find();
        if (alojamiento && clientes)
            res.render('reservas/reserva', {
                alojamiento: alojamiento,
                clientes: clientes
            });
        else
            res.render('mensaje', {mensajePagina:'No encuentro esa reserva en la base de datos'});
    } catch (error) {
        console.log(error);
        res.render('mensaje', {mensajePagina: 'Error al reservar en alojamiento'});

    }

});

router.post('/alojamiento/:id', async (req, res) => {
    try {
        const {cliente, date} = req.body;

        const alojamiento = await Alojamiento.findById(req.params.id); 
        const clienteMongo = await Cliente.findById(cliente);
        
        if(alojamiento && clienteMongo) {
            const reserva = new Reserva({
                cliente: clienteMongo._id,
                alojamiento: alojamiento._id,
                fecha: date                
            });
            await reserva.save();            
        } else {
            res.render('mensaje', {mensajePagina: 'Error al intentar reservar un alojamiento'});
        }
        
    } catch (error){
        console.log(error);
        res.render('mensaje', {mensajePagina: 'Error al intentar reservar un alojamiento'});
    }   
    res.redirect('/reservas/alojamiento/'+req.params.id); 
});


router.get('/cliente/:id', async (req, res) => {
    try {
        const alojamientos = await Alojamiento.find();
        const cliente = await Cliente.findById(req.params.id);
        if (alojamientos && cliente) {
            res.render('reservas/cliente', {
                alojamientos: alojamientos,
                cliente: cliente
            });
        } else {
            res.render('mensaje', {mensajePagina:'No encuentro ese alojamiento en la base de datos'});
        }
    } catch (error) {
        console.log(error);
        res.render('mensaje', {mensajePagina: 'Error al reservar en alojamiento'});
    }

});


module.exports=router;