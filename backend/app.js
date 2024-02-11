const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Como es una APP Web, app es un servidor Web.
const app = express();
const session = require('express-session');

// como los properties de Java
const dotenv = require('dotenv');

// motor de HTML es PUG
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));

// la carpeta public tiene contenido estático
app.use(express.static('public'));

// cargarmos y configuramos el middleware para gestión de sesiones
app.use(session({
    secret: 'msupersecretoinconfesable',
    resave: true,
    saveUninitialized: false
}));
app.use((req,res,next)=>{
    res.locals.currentUser = req.session.user;
    if (!req.session.user){        
        if (req.path.startsWith('/auth/login') ||
            req.path.startsWith('/auth/register')){
            // para hacer el GET/POST al login
            next();            
        } else {
            // cuando es una ruta distinta a login
            // me redirecciona al login
            return res.redirect('/auth/login');
        }
    } else {
        // ya estamos logeados
        
        next();
    }
});

// cargamos configuración desde .env
dotenv.config();
mongoose.connect(process.env.MONGO_URL);

// añadimos las rutas de AUTH.JS
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const authorize = (roles) => {
    return (req, res, next) => {
        const { user } = req.session;
        if (!user || !roles.includes(user.rol)) {
            return res.render('mensaje', {mensajePagina:'No tienes permiso para acceder a esta página.'});
        }
        next();
    };
};

const reservaRoutes = require('./routes/reservas');
app.use('/reservas', authorize(['operario']), reservaRoutes);

const alojamientoRouter = require('./routes/alojamientos');
app.use('/alojamientos', authorize(['operario']), alojamientoRouter);

const usuarioRoutes = require('./routes/usuarios');
app.use('/usuarios', authorize(['operario']), usuarioRoutes);

const reservarRoutes = require('./routes/reservar');
app.use('/reservar', authorize(['cliente', 'operario']), reservarRoutes);


// por defecto vamos a /auth
app.get('/', (req, res) => {
    res.redirect('/auth');
});


app.listen(process.env.SERVER_PORT, () => {
    console.log(
        `Servidor en funcionamiento en el puerto ${process.env.SERVER_PORT}`);
});
