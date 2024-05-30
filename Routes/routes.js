/*
    Este archivo sirve para enrutar todas aquellas paginas que son 
    necesarias para el funcionamiento de la pagina web
*/

const express = require('express');
const router = express.Router();

// Ruta de login
const loginView = require('./loginView'); 

// Ruta del signup
const signupView = require('./signupView');
const signupP = require('./signup');

// Ruta de la pantalla principal
const pPrincipalView = require('./indexView');

// Ruta de la pantalla de "myCreatedTask"
const pMyCreatedTask = require('./createdTaskView');

// Ruta de la pantalla de "newTask"
const pNewTask = require('./createTaskView');

// RUTAS para usar en AJAX
const getDataCounterIndex = require('./solicitudesAJAX/getDataCounterIndex');
const getDataNotifications = require('./solicitudesAJAX/getStatesNotification');
// Confuguracion de las rutas AJAX
router.use('/get-counter-data', getDataCounterIndex);
router.use('/get-state-notif', getDataNotifications);


// Configuracion login
router.use('/', loginView);

// Configuracion del sigup
router.use('/sign-up', signupView);
router.use('/signup-new-user', signupP);


// Configuracion de la pantalla principal
router.use('/tasks', pPrincipalView);

// Configuracion de la pantalla de myCreatedTask
router.use('/created-tasks', pMyCreatedTask);

// Configuracion de la pantalla de newTask
router.use('/new-task', pNewTask);


// Exportacion del archivo
module.exports = router;