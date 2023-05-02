##Inventario de productos
Descripción
Este proyecto tiene como objetivo llevar un control del inventario de productos de una empresa y generar archivos PDF descargables o enviarlos por correo electrónico.

## deploy en : http://18.231.69.247:5001
Tecnologías utilizadas
Node.js
Express.js
MongoDB
Mongoose
JWT (JSON Web Tokens)
bcrypt
Bootstrap
Reactstrap
pdfmake
pdfkit
cors
swagger-jsdoc
swagger-ui-express
Instalación
Clona este repositorio en tu máquina local.
Ejecuta el comando npm install para instalar todas las dependencias necesarias.
Crea un archivo .env en la raíz del proyecto y agrega tus variables de entorno.
Ejecuta el comando npm run dev para iniciar el servidor en modo de desarrollo.
Abre http://localhost:3000 en tu navegador.
Variables de entorno
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

PORT - El puerto en el que se ejecutará el servidor.
MONGODB_URI - La URI de MongoDB.
JWT_SECRET - La clave secreta para generar los JWT.
Endpoints de la API
Puedes encontrar la documentación de la API en la ruta /api-docs.


