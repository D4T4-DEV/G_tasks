const security = require('../Models/autenticator/autenticator');
const userModel = require('../Models/userModel');

// Función asincrónica para registrar un usuario
async function signUpUser(username, email, password_hash) {
    // Se encriptan el username, email y password_hash de forma paralela
    var [userSec, emailSec, passwordHashSec] = await Promise.all([
        security.encryptData(username),
        security.encryptData(email),
        security.encryptData(password_hash)
    ]);

    // Se registra al usuario en la base de datos por la API
    return await userModel.signUpUser(`${userSec},${emailSec},${passwordHashSec}`);
}

async function logInUser(username, pwd){
    // Se encriptan el username y pwd de forma paralela
    var [userSec, pwdSec] = await Promise.all([
        security.encryptData(username),
        security.encryptData(pwd)
    ]);

    // Se procede con los del usuario por la API y se intenta loguear
    return await userModel.loginUser(`${userSec},${pwdSec}`);
}

async function getAllDataUsers(){
    return await userModel.getAllDataUsers();
}

module.exports = {
    signUpUser,
    logInUser,
    getAllDataUsers
};