const express = require('express');
const router = express.Router();

const taskController = require('../Controllers/tasksController');
const userController = require('../Controllers/userController');
const { organizeByAlphabetUsersSe } = require('../Models/OrganizadorInfo/organiceDataUser');
const {authenticate} = require('../Models/autenticator/autenticator');

router.get('/:id', authenticate, async (req, res) => {
    const idTask = req.params.id; // aspecto que viene del server
    const token = req.cookies.token;
    try {
        const dataForModalRes = await taskController.getTaskForModel(idTask, token);

        const dataSoloForModalRes = dataForModalRes.data;

        if (dataSoloForModalRes.asigUs === null) {
            return res.json({
                dataForModal: dataSoloForModalRes,
                usersOrden: null
            });
        } else {
            const dataOrgAssignedUsers = await organizeByAlphabetUsersSe(dataSoloForModalRes.asigUs.split(',').map(dt => dt.trim()));
            return res.json({
                dataForModal: dataSoloForModalRes,
                usersOrden: dataOrgAssignedUsers
            });
        }

    } catch (err) {
        console.error('No traje ningun dato, me perdonas? :(', err);
        return res.json({
            dataForModal: null,
            usersOrden: null
        });
    }

});


module.exports = router;