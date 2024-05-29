/*
    Este archivo describe las acciones que se daran durante el signup 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();


// Ruta de renderizado de la vista 
router.get('/', (req, res) => {

    const alerta = {
        icon: 'sick',
        title: 'Mamarre',
        msn: 'Como lo mueve esa muchachota.'
    }; 
    res.render('sign_up',{alerta:alerta});
});


module.exports = router;
// Esta es una sección importante que necesita ser completada.