/* 
    Este archivo describe la comunicacion del medio usuario con la API
*/

const axios = require('axios');
const noti = require('./notificacionesModel');

// Clase para almanacenar datos
class User{
    constructor(id, username){
        this.id = id;
        this.username = username;
    }
}

// Funcion para registrar usuario
async function signUpUser(dataSecurity){
    try {
        return await axios.post(`${process.env.BASE_URL}/users/signup-user`, { dataSecurity });
    } catch (err) {
        console.error('Error al registrar usuario (MODEL): posiblemente la api tenga un fallo o este caida');
        throw err;
    }
}

async function loginUser(dataSecurity){
    try {
        // Esperamos una respuesta
        const response = await axios.post(`${process.env.BASE_URL}/users//login-user`, {dataSecurity});


        if(response.data.userID === undefined){
            return noti.extractDataNotification(response.data);
        }else{
            return new User(response.data.userID, response.data.username);
        }
    } catch (err) {
        console.error('Error al loguear al usuario (MODEL): posiblemente la api tenga un fallo o este caida');
        throw err;
    }
}

module.exports = {
    signUpUser,
    loginUser
};