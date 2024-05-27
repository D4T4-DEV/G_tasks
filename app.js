// INICIALIZACION DE LIBRERIAS 
    // express
const express = require('express');
const app = express();
    // Path
const path = require('path');


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
const router = require("./Controllers/Routes/routes");
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