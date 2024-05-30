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

// FUNCIONES PROPIAS Y DEMAS
const userController = require('./Controllers/userController');


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

// CONFIGURACION DE PASSPORT para tokens
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'pwd',
},
  async (username, pwd, done) => {
    // ASPECTOS QUE HARA LA VERIFICACION
    try{
      var userData = userController.logInUser(username, pwd);

      // Si no trajo nada :(
        if (!userData) {
          avisoLogin = "Por favor verifica las credenciales ingresadas en el LOCALSTRATEGY";
          console.log("Se ha experimentado este error: credenciales incorrectas" + "\n");
          return done(null, false);
        }
        return done(null, userData);
    } catch (err) {
      return done(null, false); // Manejamos este error por consola debido a que si no esta el server la aplicacion muere
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

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

// Inicializacion del puerto que será ejecutado el server local
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});