/*
    Este archivo describe las acciones que se daran durante la pantalla principal 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Ruta de renderizado de la vista 
router.get('/', async (req, res) => {

    const dataAllUsers = await userController.getAllDataUsers();

    // const alerta = {
    //     icon: 'sick',
    //     title: 'Connection error',
    //     msg: 'Can not connect to server.'
    // };

    // console.log(dataAllUsers);

    res.render('dashboard', {});
});


module.exports = router;
// Esta es una sección importante que necesita ser completada.