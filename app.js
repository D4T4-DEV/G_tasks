// INICIALIZACION DE LIBRERIAS 
    // express
const express = require('express');
const app = express();
    // Dotenv
const dotenv = require('dotenv'); // Aspecto para poder tomar las variables de entorno
dotenv.config();
    // Path
const path = require('path');
    // Express-session
const session = require('express-session');
    // Passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
    // CookieParser
const cookieParser = require('cookie-parser');


// Middleware para gestionar las cookies
app.use(cookieParser());

// Middleware para crear sesiones
app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET, // Palabra que se usara para cifrar las sesiones
  resave: false,
  saveUninitialized: false,
  //store: -> Esto lo podemos poner para poder guardar las sesion en un lugar por el momento no
}));

// Configurar Passport.js
app.use(passport.initialize());
app.use(passport.session());


// Configuración de la plantilla Pug
app.set('view engine', 'pug');
// Hace accesible las vistas (codigo PUG) al server, indicandole la ruta construida por __dirname y concatenando "Views"
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));

// Middleware para poder obtener el contenido de las solicitudes POST en formularios
app.use(express.urlencoded({ extended: true })); // Aceptar Cadenas o arreglos
app.use(express.json()); // -> Entender datos en Formato JSON

//Rutas 
const router = require("./Routes/routes");
app.use('/', router); // Seteo de rutas puestas en el archivo de ROUTES


// Prueba del formulario
app.post('/create-new-task', (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const title = req.body.title;
  const user = req.body.user;
  const taskRespon = req.body['task-responsibility'];
  const instructions = req.body.instructions;
  const deadline = req.body['date-finish'];


  // Imprimimos en consola
  console.log('Title:', title);
  console.log('User:', user);
  console.log('Responsability', taskRespon);
  console.log('Instructions:', instructions);
  console.log('Deadline:', deadline);

  // Respuesta generica
  res.send('Tarea creada correctamente');
});



// Inicializacion del puerto que será ejecutado el server local
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});