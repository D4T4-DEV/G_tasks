const axios = require('axios');
const notif = require('./notificacionesModel');


async function createNewTask(title, userRespons, descrip, date_finish, user_respon, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        // Esperamos una respuesta 
        var response = await axios.post(`${process.env.BASE_URL}/task/new-task`, { title, userRespons, descrip, date_finish, user_respon }, axiosConfig);
        return notif.extractDataNotification(response.data);
    } catch (err) {
        console.error('Error al crear una tarea (MODEL): posiblemente la api tenga un fallo o este caida');
        throw err;
    }
}

module.exports = {
    createNewTask
};