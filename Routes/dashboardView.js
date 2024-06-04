/*
    Este archivo describe las acciones que se daran durante la pantalla principal 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const taskController = require('../Controllers/tasksController');
const { organizeByAlphabet } = require('../Models/OrganizadorInfo/organiceDataUser');
const { extractDataNotification, createNotification } = require('../Models/notificacionesModel');
const {authenticate} = require('../Models/autenticator/autenticator');

// Ruta de renderizado de la vista 
router.get('/', authenticate, async (req, res) => {

    var dataAllUsers = undefined;
    var alert = req.session.alert;
    delete req.session.alert;
    const token = req.cookies.token;

    try {
        // Obtenemos todos los datos de los usuarios
        dataAllUsers = await userController.getAllDataUsers(token);

        // Devolucion de las tareas por usuario y o por ser el creador 
        const Task = await taskController.getMyTaskAssigned(req.user.id, token);
        const tasksToDo = Task.filter(task => task.stateOfTask === 1 && isUserAssigned(task, req.user.id));
        const tasksDoing = Task.filter(task => task.stateOfTask === 2 && isUserAssigned(task, req.user.id));
        const tasksDone = Task.filter(task => task.stateOfTask === 3 && isUserAssigned(task, req.user.id));

        res.render('dashboard', {
            alerta: alert,
            userID: req.user.id,
            user: req.user.username,
            userData: organizeByAlphabet(dataAllUsers),
            Task: Task,
            tasksToDo: tasksToDo,
            tasksDoing: tasksDoing,
            tasksDone: tasksDone
        });

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

// Aspectos para obtener el id si es participante
function isUserAssigned(task, userId) {
    const assignedUsers = task.assignedUsersID.split(',')
        .map(id => id.trim())
        .filter(id => id !== '');
    return assignedUsers.includes(userId.toString());
}
module.exports = router;
// Esta es una sección importante que necesita ser completada.