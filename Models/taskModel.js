const axios = require('axios');
const notif = require('./notificacionesModel');


class Tasks{
    constructor(taskID, taskOwnerUserID, assignedUsersID, titleTask, taskResponsibilityUserID, instructionsTask, dateCreation, deadLineTask, stateOfTask, commentsTaskFinishOrCancell, dateFinishTaskOrCancel ){
        this.taskID = taskID;
        this.taskOwnerUserID = taskOwnerUserID;
        this.assignedUsersID = assignedUsersID;
        this.titleTask = titleTask;
        this.taskResponsibilityUserID = taskResponsibilityUserID;
        this.instructionsTask = instructionsTask;
        this.dateCreation = dateCreation;
        this.deadLineTask = deadLineTask;
        this.stateOfTask = stateOfTask;
        this.commentsTaskFinishOrCancell = commentsTaskFinishOrCancell;
        this.dateFinishTaskOrCancel = dateFinishTaskOrCancel;
    }
}

async function createNewTask(owner, title, userRespons, descrip, date_finish, user_respon, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        // Esperamos una respuesta 
        var response = await axios.post(`${process.env.BASE_URL}/task/new-task`, { owner, title, userRespons, descrip, date_finish, user_respon }, axiosConfig);
        return notif.extractDataNotification(response.data);
    } catch (err) {
        console.error('Error al crear una tarea (MODEL): posiblemente la api tenga un fallo o este caida');
        throw err;
    }
}

async function getMyTaskAssigned(userID, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        // Esperamos una respuesta 
        var response = await axios.get(`${process.env.BASE_URL}/task/get-my-task/${userID}`, axiosConfig);
        return response.data.map(dt=> new Tasks(dt.taskID, dt.taskOwnerID, dt.assignedUsersID, dt.titleTask, dt.taskResponsibility, dt.instructionsTask, dt.dateCreation, dt.deadLineTask, dt.stateOfTask, dt.commentsTaskFinishOrCancell, dt.dateFinishTaskOrCancel));
    } catch (err) {
        console.error('Error al obtener las tareas por ID una tarea (MODEL): posiblemente la api tenga un fallo o este caida');
        throw err;
    }
}

async function getTaskForModel(idTask, token){
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    
    try {
        // Esperamos una respuesta 
        var response = await axios.get(`${process.env.BASE_URL}/task//get-task-for-model/${idTask}`, axiosConfig);
        return response;
    } catch (err) {
        console.error('Error al obtener las tareas por ID una tarea (MODEL): posiblemente la api tenga un fallo o este caida');
        throw err;
    }
}

module.exports = {
    createNewTask,
    getMyTaskAssigned,
    getTaskForModel
};