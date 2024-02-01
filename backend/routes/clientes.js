const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Cliente = require('../models/Cliente');

router.get('/', async(req, res) => {
    const listado = await Cliente.find({});
    res.render('clientes/index', {clientes: listado});
});

router.get('/create', (req, res) =>{
    res.render('clientes/create')
});

router.post('/create', async (req, res) =>{
    const {nombre, apellido, telefono, email} = req.body;
    const cliente = new Cliente({
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        email: email
    });
    try {
        await cliente.save();
        res.redirect('/clientes');
    } catch (error) {
        res.render('mensaje', {mensajePagina: 'ERROR: ' + 
            'El correo electrónico o el teléfono proporcionado ya existía en la base de datos.'})
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (cliente)
            res.render('clientes/edit', {cliente: cliente});
        else
            res.render('mensaje', {mensajePagina:'No encuentro ese cliente en la base de datos'});
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar editar cliente'});
    }

});

router.post('/edit/:id', async (req, res) => {
    try {
        const {nombre, apellido, telefono, email} = req.body;
        await Cliente.findByIdAndUpdate(req.params.id ,{
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            email: email
        }); 
        res.redirect('/clientes');
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar editar cliente'});
    }

});


router.get('/delete/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (cliente)
            res.render('clientes/delete', {cliente: cliente});
        else
            res.render('mensaje', {mensajePagina:'No encuentro ese cliente en la base de datos'});
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar borrar cliente'});
    }

});

router.post('/delete/:id', async (req, res) => {
    try {
        const {nombre, apellido, telefono, email} = req.body;
        await Cliente.findByIdAndDelete(req.params.id); 
        res.redirect('/clientes');
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar borrar cliente'});
    }

});


module.exports=router;
