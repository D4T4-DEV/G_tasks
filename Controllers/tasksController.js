const taskModel = require('../Models/taskModel');

async function createNewTask(owner, title, userRespons, descrip, date_finish, user_respon, token){

    // Se procede con los del usuario por la API y se intenta crear una tarea
    return await taskModel.createNewTask(owner, title, userRespons, descrip, date_finish, user_respon, token);
}

async function getMyTaskAssigned(userID, token){
    return await taskModel.getMyTaskAssigned(userID, token);
}

module.exports = {
    createNewTask,
    getMyTaskAssigned
};