const security = require('../Models/autenticator/autenticator');
const userModel = require('../Models/userModel');

// Función asincrónica para registrar un usuario
async function signUpUser(username, email, password_hash) {
    // Se encriptan el nombre, email y hash de la contraseña de forma paralela
    var [userSec, emailSec, passwordHashSec] = await Promise.all([
        security.encryptData(username),
        security.encryptData(email),
        security.encryptData(password_hash)
    ]);

    // Se registra al usuario en la base de datos por la API
    return await userModel.signUpUser(`${userSec},${emailSec},${passwordHashSec}`);
}

module.exports = {
    signUpUser
};