const express = require('express');
const router = express.Router();
const { extractDataNotification, createNotification } = require('../Models/notificacionesModel'); // Aspecto que viene del modelo notificaciones

const taskController = require('../Controllers/tasksController');

router.get('/:id', async (req, res) => {
    const idTask = req.params.id; // aspecto que viene del server
    const token = req.cookies.token;

    try {
        const result = await taskController.acTask(idTask, token);
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