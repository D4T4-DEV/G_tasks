const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/tasksController');
const { extractDataNotification, createNotification } = require('../Models/notificacionesModel'); // Aspecto que viene del modelo notificaciones

router.post('/:id', async (req, res) => {
    const idTask = req.params.id; // aspecto que viene del server
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
        const result = await taskController.modifyTask(idTask, title, userRespons, descrip, date_finish, users, req.cookies.token);
        req.session.alert = extractDataNotification(result.data);
        res.redirect('/dashboard');
    } catch (err) {
        if (err.response) {
            // Analisis de la respuesta que nos dio la API, aunque no sea algo estable, mantiene los datos
            req.session.alert = extractDataNotification(err.response.data);
        }
        // Aviso generico cuando la API no esta encendida
        req.session.alert = createNotification('sick', 'Oh no...', `We're having troubles, please try again later.`);
        res.redirect('/');
    }

});

module.exports = router;