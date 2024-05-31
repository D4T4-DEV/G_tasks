/*
    Este archivo describe las acciones que se daran durante el registro a la 
    por la API a la BD y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const security = require('../Models/autenticator/autenticator');
const { extractDataNotification, createNotification } = require('../Models/notificacionesModel'); // Aspecto que viene del modelo notificaciones

// Ruta de registrar usuario
router.post('/', async (req, res) => {
    const { username, email, pwd, confirmPassword } = req.body;
    const emailRegex = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/; // REGEX para comparar el correo

    // Notificaciones por cualidades erroneas en el formulario
    if(!emailRegex.test(email) && (pwd !== confirmPassword)){
        // Aviso cuando el email no es valido
        req.session.alert = createNotification('text_fields', 'Oh no...', `Please verify the data entered`);
        return res.redirect('/sign-up');
    }

    if(!emailRegex.test(email)){
        // Aviso cuando el email no es valido
        req.session.alert = createNotification('email', 'Oh no...', `The email entered is not valid`);
        return res.redirect('/sign-up');
    }

    if (pwd !== confirmPassword) {
        // Aviso cuando las contraseñas no coinciden
        req.session.alert = createNotification('key', 'Oh no...', `Passwords entered do not match`);
        return res.redirect('/sign-up');
    }

    // Interaccion con la API
    try {

        var password_hash = await security.getHash(pwd);
        // Pasamos los datos al controlador para que este se comunique en la API
        notify = await userController.signUpUser(username, email, password_hash);

        // Analisis de la respuesta que nos dio la API
        if (notify.status === 200) {
            req.session.alert = extractDataNotification(notify.data);
        }

        if (notify.status === 201) {
            req.session.alert = extractDataNotification(notify.data);
            return res.redirect('/sign-up');
        }

        // Usuario insertado correctamente
        res.redirect('/');

    } catch (error) {
        if (error.response) {
            // Analisis de la respuesta que nos dio la API, aunque no sea algo estable, mantiene los datos
            req.session.alert = extractDataNotification(error.response.data);
        }

        // Aviso generico cuando la API no esta encendida
        req.session.alert = createNotification('sick', 'Oh no...', `We're having troubles, please try again later.`);
        res.redirect('/sign-up');
    }

});


module.exports = router;