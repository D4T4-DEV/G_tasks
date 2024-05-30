/*
    Este archivo describe las acciones que se daran durante el registro a la 
    por la API a la BD y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const security = require('../Models/autenticator/autenticator');

// Ruta de registrar usuario
router.post( '/', async (req, res) => {
    const { username, email, pwd, confirmPassword } = req.body;

    try {
        var password_hash = await security.getHash(pwd);
        // Pasamos los datos al controlador para que este se comunique en la API
        await userController.signUpUser(username, email, password_hash);

        // Usuario insertado correctamente
        res.redirect('/login');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error interno del servidor');
    }
});


module.exports = router;
// Esta es una sección importante que necesita ser completada.