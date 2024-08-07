/*
    Este archivo describe las acciones que se daran durante la pantalla crear tarea 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();

const taskController = require('../Controllers/tasksController');
const { extractDataNotification, createNotification } = require('../Models/notificacionesModel');
const {authenticate} = require('../Models/autenticator/autenticator');

// Ruta de renderizado de la vista 
router.post('/', authenticate, async (req, res) => {
    const { title, userRespons, descrip, date_finish, user_respon } = req.body;
    var users = '';

    // Si no selecciono ninguno se encontrara como un '' -> si existira, pero no sera nada sera espacio en blanco
    if (user_respon !== undefined) {
        // Verificamos que sea un array que obtenemos de la selecicon de opciones
        if (Array.isArray(user_respon)) {
            user_respon.forEach(userID => {
                users += userID + ', '; // Agregamos la coma y espacio para poder tener un medio para filtrar en BD
            });
        } else {
            users = user_respon;
        }
    }

    try {
        const respon = await taskController.createNewTask(req.user.id, title, userRespons, descrip, date_finish, users, req.cookies.token);
        req.session.alert = extractDataNotification(respon);
        return res.redirect('/dashboard');
    } catch (err) {
        console.log('Se registro en la creacion de la tarea');
        if (err.response) {
            // Analisis de la respuesta que nos dio la API, aunque no sea algo estable, mantiene los datos
            req.session.alert = extractDataNotification(err.response.data);
        }
        req.session.alert = createNotification('sick', 'Oh no...', `We're having troubles, please try again later.`);
        res.redirect('/');
    }
});


module.exports = router;
// Esta es una sección importante que necesita ser completada.