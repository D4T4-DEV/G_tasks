/*
    Este archivo describe las acciones que se daran durante la pantalla principal 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();
var stateNotification = 0;
// Ruta de respuesta AJAX de la vista 'index'
router.get('/', (req, res) => {
    res.json({
        notification: Math.floor(Math.random() * 3) + 1 // Cambiar esto, solo es prueba uwu
    });
});


module.exports = router;
// Esta es una sección importante que necesita ser completada.