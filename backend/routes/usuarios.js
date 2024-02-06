const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

// muestra en una tabla la lista de usuarios
router.get('/', async(req, res) => {
    const listado = await Usuario.find({});
    res.render('usuarios/index', {usuarios: listado});
});

// muestra el formulario alta usuario
router.get('/create', (req, res) =>{
    res.render('usuarios/create')
});

// guarda el usuario en la BBDD
router.post('/create', async (req, res) =>{
    const datosUsuario = req.body;
    datosUsuario.password = bcrypt.hashSync(datosUsuario.password, 10);
    const usuario = new Usuario(datosUsuario);

    try {
        await usuario.save();
        res.redirect('/usuarios');
    } catch (error) {
        console.log(error);
        res.render('mensaje', {mensajePagina: 'ERROR: ' + 
            'El correo electrónico o el teléfono proporcionado ya existía en la base de datos.'})
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (usuario)
            res.render('usuarios/edit', {usuario: usuario});
        else
            res.render('mensaje', {mensajePagina:'No encuentro ese usuario en la base de datos'});
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar editar usuario'});
    }

});

router.post('/edit/:id', async (req, res) => {
    try {
        const datosUsuario = req.body;
        if (datosUsuario.password) {
            if (datosUsuario.password.length<4) {
                delete datosUsuario['password'];
                res.render('mensaje', {mensajePagina: 'Error al actualizar el PASSWD: al menos 4 letras!'});
            } else {
                datosUsuario.password= bcrypt.hashSync(datosUsuario.password, 10);
            }
        } else {
            delete datosUsuario['password'];
        }        
        await Usuario.findByIdAndUpdate(req.params.id , datosUsuario); 
        res.redirect('/usuarios');
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar editar usuario'});
    }

});


router.get('/delete/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (usuario)
            res.render('usuarios/delete', {usuario: usuario});
        else
            res.render('mensaje', {mensajePagina:'No encuentro ese usuario en la base de datos'});
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar borrar usuario'});
    }

});

router.post('/delete/:id', async (req, res) => {
    try {
        const {nombre, apellido, telefono, email} = req.body;
        await Usuario.findByIdAndDelete(req.params.id); 
        res.redirect('/usuarios');
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar borrar usuario'});
    }

});

module.exports=router;