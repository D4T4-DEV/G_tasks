const taskModel = require('../Models/taskModel');

async function createNewTask(owner, title, userRespons, descrip, date_finish, user_respon, token){
    // Se procede con los del usuario por la API y se intenta crear una tarea
    return await taskModel.createNewTask(owner, title, userRespons, descrip, date_finish, user_respon, token);
}

async function getMyTaskAssigned(userID, token){
    return await taskModel.getMyTaskAssigned(userID, token);
}


async function getTaskForModel(idTask, token){
    return await taskModel.getTaskForModel(idTask, token);
}

async function modifyTask(idTask, title, userRespons, descrip, date_finish, user_respon, token){
    return await taskModel.modifyTask(idTask, title, userRespons, descrip, date_finish, user_respon, token);
}


async function deleteTask(idTask, token){
    return await taskModel.deleteTask(idTask, token);
}

async function acTask(idTask, token) {
    return await taskModel.acTask(idTask, token);
}

async function termiTask(idTask, userID, reason, token){
    return await taskModel.termiTask(idTask, userID, reason, token);
}

async function cancellTask(idTask, userID, reason, token){
    return await taskModel.cancellTask(idTask, userID, reason, token);
}

module.exports = {
    createNewTask,
    getMyTaskAssigned,
    getTaskForModel,
    modifyTask,
    deleteTask,
    acTask,
    termiTask,
    cancellTask
};