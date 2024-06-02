const express = require('express');
const router = express.Router();

const taskController = require('../Controllers/tasksController');

router.get('/:id', async (req, res) => {
    const idTask = req.params.id; // aspecto que viene del server
    const token = req.cookies.token;

    try {
        const dataForModal = await taskController.getTaskForModel(idTask, token);
        console.log(dataForModal.data);
    } catch (err) {
        
    }
    

    res.json({
        alerta: 1,
        userID: 2,
        user: 3,
        userData: 4,
        Task: 5,
        tasksToDo: 6,
        tasksDoing: 7,
        tasksDone: 8
    });
});


module.exports = router;