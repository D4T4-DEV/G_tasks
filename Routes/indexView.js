/*
    Este archivo describe las acciones que se daran durante la pantalla principal 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();

// Ruta de renderizado de la vista 
router.get('/', (req, res) => {
    const alerta = {
        icon: 'sick',
        title: 'Connection error',
        msn: 'Can not connect to server.'
    };


    res.render('index', {alerta: alerta});
});


module.exports = router;
// Esta es una sección importante que necesita ser completada.