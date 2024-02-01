const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Alojamiento = require('../models/Alojamiento');

// muestra en una tabla la lista de 
router.get('/', async(req, res) => {
    const listado = await Alojamiento.find({});
    res.render('alojamientos/index', {alojamientos: listado});
});

// muestra el formulario alta alojamiento
router.get('/create', (req, res) =>{
    res.render('alojamientos/create')
});

// guarda el alojaiento en la BBDD
router.post('/create', async (req, res) =>{
    const {nombre, telefono, direccion} = req.body;
    const alojamiento = new Alojamiento({
        nombre: nombre,
        telefono: telefono,
        direccion: direccion
    });
    try {
        await alojamiento.save();
        res.redirect('/alojamientos');
    } catch (error) {
        res.render('mensaje', {mensajePagina: 'ERROR: ' + 
            'El correo electrónico o el teléfono proporcionado ya existía en la base de datos.'})
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const alojamiento = await Alojamiento.findById(req.params.id);
        if (alojamiento)
            res.render('alojamientos/edit', {alojamiento: alojamiento});
        else
            res.render('mensaje', {mensajePagina:'No encuentro ese alojamiento en la base de datos'});
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar editar alojamiento'});
    }

});

router.post('/edit/:id', async (req, res) => {
    try {
        const {nombre, telefono, direccion} = req.body;
        const alojamiento = new Alojamiento({
        nombre: nombre,
        telefono: telefono,
        direccion: direccion
        });
        res.redirect('/alojamientos');
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar editar alojamiento'});
    }

});


router.get('/delete/:id', async (req, res) => {
    try {
        const alojamiento = await Alojamiento.findById(req.params.id);
        if (alojamiento)
            res.render('alojamientos/delete', {alojamiento: alojamiento});
        else
            res.render('mensaje', {mensajePagina:'No encuentro ese alojamiento en la base de datos'});
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar borrar alojamiento'});
    }

});

router.post('/delete/:id', async (req, res) => {
    try {
        await Alojamiento.findByIdAndDelete(req.params.id); 
        res.redirect('/alojamientos');
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar borrar alojamiento'});
    }

});


module.exports=router;
