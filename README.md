# Proyecto G_Tasks

## Instrucciones para poder ejecutarlo

Tendrás que cumplir con los siguientes medios:

- Tener instalado Node.js
    - Instalar las siguientes dependencias:
        - Dependencias Generales:
            - axios
            - bcrypt
            - cookie-parser
            - dotenv
            - express
            - express-session
            - jsonwebtoken
            - passport
            - passport-local
            - pug
            - sass
        - Dependencias de desarrollador:
            - nodemon
            - npm-run-all

- Tener un archivo `.env` en la raíz del proyecto en donde debera contener los siguientes valores:
    - `BASE_URL` → Este corresponde al puerto y direccion de la API, ya que se complementan, deberia tener un dato algo parecido a este `http://localhost:3004`
    - `AES_PRIVATE_KEY` → Este lo generas con OpenSSL, con el comando `openssl rand -hex 32`
    - `RSA_PRIVATE_KEY` → Este lo generas en la siguiente link: `https://travistidwell.com/jsencrypt/demo/`, la extension debe ser de `4096 bits`
    - `ACCESS_TOKEN_SECRET` → Corresponde a la palabra secreta que usará `passport`.
    - `PASSWORD_SALT_ROUNDS` → Corresponde a las vueltas que tomara `bcrypt` para encriptar la contraseña del usuario.


- Tener en ejecucion el proyecto de `G_tasks_API`, y tener en iguales las variables de entorno de `RSA_PRIVATE_KEY`, `AES_PRIVATE_KEY`, en ambos proyectos.
    - El proyecto `G_tasks_API`, lo encuentras en: `https://github.com/D4T4-DEV/G_tasks_API`

### Instrucciones para poder ejecutarlo

- Para ejecutarlo bastará con correr el siguiente comando en terminal:
    - `npm start` y esta empezará a correr en el puerto `3000`.


#### Tipo de "proyecto": 
- Lista de Tareas colaborativas.

#### Nota: 
Si no quieres instalar una a una las dependencias puedes correr el siguiente comando estando dentro del directorio del proyecto (usando la terminal):

- Dependencias descritas:
    - `npm run dp`, este comando 'dp', viene del archivo `package.json`

#### Los recursos (iconos y demás):
- Los iconos utilizados en la página fueron tomados de: `https://fonts.google.com/icons` y las fuentes de `https://fonts.google.com/`