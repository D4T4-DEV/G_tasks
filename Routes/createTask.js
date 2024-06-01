/*
    Este archivo describe las acciones que se daran durante la pantalla crear tarea 
    y como se mostrará en cuestión.
*/

const express = require('express');
const router = express.Router();

// Ruta de renderizado de la vista 
router.post('/', (req, res) => {
    const { title, userRespons, descrip, date_finish, user_respon } = req.body;

    // console.log("recibi datos!");
    // console.log(title);
    // console.log(userRespons);
    // console.log(descrip);
    // console.log(date_finish);
    // console.log(user_respon);

    
});


module.exports = router;
// Esta es una sección importante que necesita ser completada.