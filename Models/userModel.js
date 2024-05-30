/* 
    Este archivo describe la comunicacion del medio usuario con la API
*/

const axios = require('axios');

// Clase para almanacenar datos
class User{
    constructor(id, username, pwd_hash){
        this.id = id;
        this.username = username;
        this.pwd_hash = pwd_hash;
    }
}

// Funcion para registrar usuario
async function signUpUser(dataSecurity){
    try {
        return await axios.post(`${process.env.BASE_URL}/users/signup-user`, { dataSecurity });
    } catch (err) {
        console.error('Error al registrar usuario (MODEL): posiblemente la api tenga un fallo');
        throw err;
    }
}

async function loginUser(dataSecurity){
    try {
        // Esperamos una respuesta
        /*var res = */await axios.post(`${process.env.BASE_URL}/users//login-user`, {dataSecurity});

        // Procesamos esa respuesta 
        // console.log(User(res.data.id, res.data.email, res.data.pwd_hash));

    } catch (err) {
        console.error('Error al loguear al usuario (MODEL): posiblemente la api tenga un fallo');
        throw err;
    }
}

module.exports = {
    signUpUser,
    loginUser
};