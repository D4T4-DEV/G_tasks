/*
    Este archivo describe las acciones que se daran durante el inicio de sesion a la 
    API a la BD y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();

const passport = require('passport');
const security = require('../Models/autenticator/autenticator');

const { extractDataNotification, createNotification } = require('../Models/notificacionesModel'); // Aspecto que viene del modelo notificaciones

// Ruta de registrar usuario
router.post('/', passport.authenticate('local', {
    failureRedirect: '/'
}), async (req, res) => {
    // Interaccion con la API
    try {
        // console.log(req.user.id);
        // Creamos el token
        const token = security.generateToken(req.user.id, '1H');
        // Asignamos a la sesion
        res.cookie('token', token, { httpOnly: true, secure: false });

        // Usuario correctamente logueado
        res.redirect('/index');

    } catch (error) {
        if (error.response) {
            // Analisis de la respuesta que nos dio la API, aunque no sea algo estable, mantiene los datos
            req.session.alert = extractDataNotification(error.response.data);
        }

        // Aviso generico cuando la API no esta encendida
        req.session.alert = createNotification('sick', 'Oh no...', `We're having troubles, please try again later.`);
        res.redirect('/');
    }

});


module.exports = router;
// Esta es una sección importante que necesita ser completada.