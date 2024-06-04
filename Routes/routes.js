/*
    Este archivo sirve para enrutar todas aquellas paginas que son 
    necesarias para el funcionamiento de la pagina web
*/

const express = require('express');
const router = express.Router();

// Ruta de login
const loginView = require('./loginView'); 
const loginP = require('./login');

// Ruta del signup
const signupView = require('./signupView');
const signupP = require('./signup');

// Ruta de la pantalla principal
const pPrincipalView = require('./dashboardView');

// Ruta de la pantalla de "myCreatedTask"
// const createdTask = require('./createdTaskView');

// Ruta del proceso para crear una nueva tarea
const createdTask = require('./createTask');
// Ruta del proceso para modificar una tarea
const modifiTask = require('./modifyTask');
// Ruta del proceso para eliminar una tarea
const deleteTask = require('./deleteTask');

// RUTAS para usar en AJAX
const getDataForModal = require('./getDataForModal');
// const getDataNotifications = require('./solicitudesAJAX/getStatesNotification');

// Confuguracion de las rutas AJAX
router.use('/g-d-model', getDataForModal);
// router.use('/get-state-notif', getDataNotifications);


// Configuracion login
router.use('/', loginView);
router.use('/sign-in-login', loginP);

// Configuracion del sigup
router.use('/sign-up', signupView);
router.use('/signup-new-user', signupP);


// Configuracion de la pantalla principal
router.use('/dashboard', pPrincipalView);

// Crear una tarea
router.use('/create-new-task', createdTask);
// Borrar una tarea
router.use('/delete', deleteTask);
// Modificar una tarea
router.use('/edit-task', modifiTask);


// // Configuracion de la pantalla de myCreatedTask
// router.use('/created-tasks', pMyCreatedTask);

// Configuracion de la pantalla de newTask
// router.use('/new-task', pNewTask);


// Exportacion del archivo
module.exports = router;