/*
    Este archivo describe las acciones que se daran durante el login 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();


// Ruta de renderizado de la vista 
router.get('/', (req, res) => {

    var typeOfErr = 2;

    res.render('login', {typeOfError: typeOfErr});
});


module.exports = router;
// Esta es una sección importante que necesita ser completada.