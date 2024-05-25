/*
    Este archivo describe las acciones que se daran durante la pantalla principal 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();

var numCreate = 19;
var numNews = 1;
var numPending = 2;
var numComplet = 4;

// Ruta de respuesta AJAX de la vista 'index'
router.get('/', (req, res) => {
    res.json({
        numCreate: numCreate++,
        numNews: numNews,
        numPending: numPending,
        numComplet: numComplet
    });
});


module.exports = router;
// Esta es una sección importante que necesita ser completada.