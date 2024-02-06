const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) =>{
    res.render('register');
});

router.post('/register', async (req, res) =>{
    const datosUsuario = req.body;
    datosUsuario.rol='cliente'
    datosUsuario.password= bcrypt.hashSync(datosUsuario.password, 10);
    const usuario = new Usuario(datosUsuario);
    try {
        await usuario.save();
        res.render('mensaje', {tituloPagina:'Registro usuarios', mensajePagina: 'Usuario registrado'});
    } catch (error) {
        res.render('mensaje', {tituloPagina:'ERROR', mensajePagina: 'Error ' + error});
    }   
});

router.get('/login', (req, res) =>{
    res.render('login');
});

router.post('/login', async (req, res)=>{
    const {username, password} = req.body;

    const usuario = await Usuario.findOne({
        username: username
    });

    if (usuario && bcrypt.compareSync(password, usuario.password)){        
        req.session.user = usuario;
        res.redirect('/');
    } else {
        res.render('mensaje', {tituloPagina:'LOGIN', mensajePagina: 'Credenciales no válidas'});
    }
});

router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports=router;