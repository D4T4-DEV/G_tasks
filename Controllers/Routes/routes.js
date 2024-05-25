/*
    Este archivo sirve para enrutar todas aquellas paginas que son 
    necesarias para el funcionamiento de la pagina web
*/

const express = require('express');
const router = express.Router();

// Ruta de login
const loginView = require('./loginView'); 

// Ruta de la pantalla principal
const pPrincipalView = require('./indexView');


// RUTAS para usar en AJAX
const getDataCounterIndex = require('./solicitudesAJAX/getDataCounterIndex')


// Confuguracion de las rutas AJAX
router.use('/get-counter-data', getDataCounterIndex);


// Configuracion login
// router.use('/', loginView);
router.use('/', pPrincipalView);



// Exportacion del archivo
module.exports = router;