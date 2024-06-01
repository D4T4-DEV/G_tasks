/*
    Este archivo describe las acciones que se daran durante la pantalla principal 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const taskController = require('../Controllers/tasksController');
const {organizeByAlphabet} = require('../Models/OrganizadorInfo/organiceDataUser');
const { extractDataNotification, createNotification } = require('../Models/notificacionesModel');

// Ruta de renderizado de la vista 
router.get('/', async (req, res) => {

    var username = undefined;
    var dataAllUsers = undefined;
    var alert = req.session.alert;
    const token = req.cookies.token;
    delete req.session.alert;

    try {
        username = req.user.username;
        dataAllUsers = await userController.getAllDataUsers(token);
        const task = await taskController.getMyTaskAssigned(username, token);

        // console.log(task);

        var dataOrgani = organizeByAlphabet(dataAllUsers);
        res.render('dashboard', {alerta: alert,user: username, userData: dataOrgani});
    } catch (err) {
        if (err.response) {
            // Analisis de la respuesta que nos dio la API, aunque no sea algo estable, mantiene los datos
            req.session.alert = extractDataNotification(err.response.data);
        }
        console.log('Se registro en el dashboard para mostrarlo');
        req.session.alert = createNotification('sick', 'Oh no...', `We're having troubles, please try again later.`);
        res.redirect('/');
    }
    
    // const alerta = {
    //     icon: 'sick',
    //     title: 'Connection error',
    //     msg: 'Can not connect to server.'
    // };

    // console.log(dataAllUsers);
});


module.exports = router;
// Esta es una sección importante que necesita ser completada.