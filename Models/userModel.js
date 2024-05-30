/* 
    Este archivo describe la comunicacion del medio usuario con la API
*/

const axios = require('axios');

// Funcion para registrar usuario
async function signUpUser(dataSecurity){
    try {
        return await axios.post(`${process.env.BASE_URL}/users/signup-user`, { dataSecurity });
    } catch (error) {
        console.error('Error al registrar usuario: posiblemente la api tenga un fallo');
        throw error;
    }
}

module.exports = {
    signUpUser
};