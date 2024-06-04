/*
    Este archivo describe las acciones de seguridad de la conexion a la API 
*/

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { extractDataNotification, createNotification } = require('../notificacionesModel'); // Aspecto que viene del modelo notificaciones
//Configura DotEnv
dotenv.config();

// Función para encriptar datos
function encryptData(element) {
    // Se obtiene la clave privada AES del entorno y se convierte en un buffer
    const key = Buffer.from(process.env.AES_PRIVATE_KEY, 'hex');
    // Se genera un vector de inicialización aleatorio de 16 bytes
    const iv = crypto.randomBytes(16);
    // Se crea un cifrador usando el algoritmo AES-256-GCM, la clave y el IV
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    // Se encripta el texto en formato UTF-8 y se convierte a hexadecimal
    var encrypted = cipher.update(element, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Se devuelve el IV, la AuthTag y el texto encriptado, separados por ':'
    return iv.toString('hex') + ':' + cipher.getAuthTag().toString('hex') + ':' + encrypted;
}

// Función asincrónica para obtener el hash de una contraseña
async function getHash(passwordNotEncr) {
    // Se obtiene el número de rondas de sal para el hash de contraseñas desde el entorno y se convierte a entero
    const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS);
    // Se genera el hash de la contraseña usando bcrypt y el número de rondas de sal
    const password_hash = await bcrypt.hash(passwordNotEncr, saltRounds);
    // Se devuelve el hash generado
    return password_hash;
}

// Función para generar un token JWT
function generateToken(data, expirationTime) {
    // Se firma el token utilizando el algoritmo RS256 y la clave privada RSA del entorno
    return jwt.sign({ data }, process.env.RSA_PRIVATE_KEY, { algorithm: 'RS256', expiresIn: expirationTime });
}


async function authenticate(req, res, next) {
    // Verifica si hay un token en las cookies de la solicitud
    const token = req.cookies.token;

    // Si no hay token, redirige al usuario al login
    if (!token) {
        console.log('No se dio un token!');
        req.session.alert = createNotification('poker_chip', 'TOKEN INVALID', 'If there is no token, there is no information');
        return res.redirect('/');
    }

    try {
        // Verifica el token usando la clave privada RSA del entorno
        const decoded = jwt.verify(token, process.env.RSA_PRIVATE_KEY);

        // Almacena el ID del usuario en la solicitud para su posterior uso
        req.userId = decoded.userId;

        next();

    } catch (err) {
        console.log('No se pudo vericar el token!');
        req.session.alert = createNotification('poker_chip', 'TOKEN INVALID', 'Problems verifying it');
        // Si hay un error en la verificación del token, redirige al usuario al login
        return res.redirect('/');
    }
}

module.exports={
    encryptData,
    getHash,
    generateToken,
    authenticate
};