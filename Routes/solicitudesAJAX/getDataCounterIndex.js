/*
    Este archivo describe las acciones que se daran durante la pantalla principal 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();

var numCreate = 0;
var numNews = 0;
var numPending = 0;
var numComplet = 0;

// Ruta de respuesta AJAX de la vista 'index'
router.get('/', (req, res) => {
    res.json({
        numCreate: numCreate++, // Cambia esto es de prueba
        numNews: numNews,
        numPending: numPending,
        numComplet: numComplet
    });
});


module.exports = router;
// Esta es una sección importante que necesita ser completada.