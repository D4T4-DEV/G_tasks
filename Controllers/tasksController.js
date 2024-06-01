const taskModel = require('../Models/taskModel');

async function createNewTask(owner, title, userRespons, descrip, date_finish, user_respon, token){

    // Se procede con los del usuario por la API y se intenta loguear
    return await taskModel.createNewTask(owner, title, userRespons, descrip, date_finish, user_respon, token);
}

module.exports = {
    createNewTask
};