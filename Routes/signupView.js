/*
    Este archivo describe las acciones que se daran durante el signup 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();


// Ruta de renderizado de la vista 
router.get('/', (req, res) => {
    var alert = req.session.alert;
    delete req.session.alert;

    res.render('sign_up', { alerta: alert });
});


module.exports = router;