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

const security = require('./Models/autenticator/autenticator');
const {createNotification} = require('./Models/notificacionesModel'); // Aspecto para crear notificaciones

const {authenticate} = require('./Models/autenticator/autenticator');

// VARIABLES
var notifyLogin = undefined;


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
    try {
      var userOrNoty = await userController.logInUser(username, pwd);

      // Verificamos que los datos de la respuesta no sea una notificacion
      if (userOrNoty.icon) {
        console.log("Vino consigo una notificacion de la API\n");
        notifyLogin = userOrNoty;
        throw error
      } else {
        // Si no trajo nada :( o la api no esta funcionando
        // if (!userOrNoty) {
        //   notifyLogin = createNotification('sick', 'Oh no...', `We're having troubles, please try again later.`);
        //   console.log("Se ha experimentado este error: credenciales incorrectas\n");
        //   return done(null, false);
        // }
        return done(null, userOrNoty);
      }
    } catch (err) {
      if (err.response) {
        // Analisis de la respuesta que nos dio la API, aunque no sea algo estable, mantiene los datos
        notifyLogin = err.response.data;
      }

      // Si no tiene nada en un error con datos de la API (Se da por hecho que no esta en linea) y se procede
      if(notifyLogin === undefined){
        notifyLogin = createNotification('sick', 'Oh no...', `We're having troubles, please try again later.`);
      }

      return done(null, false); // Manejamos este error por consola debido a que si no esta el server la aplicacion muere
    }
  }
));

// Midleware para cerrar sesion
app.get('/logout', authenticate, async (req, res) => {

  await req.logout(async (err) => {
    if (err) {
      notifyLogin = "Error al cerrar sesión, por favor intentelo nuevamente..."
      console.error('Error al cerrar la sesión:', err + "STATUS: 500");
    }
    await req.session.destroy((err) => {
      if (err) {
        console.error('Error al destruir la sesión:', err + "STATUS: 500");
        notifyLogin = createNotification('sick', 'Oh no...', `Error signing out, please try again...`);
      }
      console.log('ESTE PROCESO -> req.session.destroy -> ha finalizado correctamente');
      notifyLogin = createNotification('logout', 'Logout', `The session has been closed.`);;
    });

    // Varificamos que:
      // -> Cerrar seión contenga un valor (Deberia ser si o si FALSE)
      // -> usuarioID exista (este viene en la sesion al loguearse)
    // si no se cumple solo quitamos la sesion y listo
    // if(CerrarSesion === undefined && usuarioID != undefined){
    //   await updateLog_Out(usuarioID);
    // }
    // usuarioID = undefined;
    // CerrarSesion = undefined;
    res.clearCookie('token');
    res.redirect('/'); // Redirigir a la página principal u otra página de tu elección
  });
});

// MIDLEWARE PERSONALIZADO
// Middleware personalizado para variables de sesion y cookies
app.use((req, res, next) => {
  // ALERTA DE PASPORT
  if(notifyLogin != undefined){
    req.session.alert = notifyLogin;
    notifyLogin = undefined;
  }

  next(); // Damos paso a la ejecucion de otros middlewares
});

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
const { error } = require('console');
app.use('/', router); // Seteo de rutas puestas en el archivo de ROUTES

// Inicializacion del puerto que será ejecutado el server local
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});