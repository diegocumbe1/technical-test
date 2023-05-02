const express = require('express');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan')
const path = require('path');
const cors = require('cors')
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const { mongoose } = require('./database')
const authRoutes = require('./routes/auth');
//settings
app.set('port',process.env.PORT || 5000)

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session({ 
    secret: 'my-secret-key' , 
    resave: false,
    saveUninitialized: false, 
}));
app.use(passport.initialize());
app.use(passport.session());


// Configuración de opciones de Swagger
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API techinical test',
        version: '1.0.0',
        description: '',
      },
    },
    apis: ['./routes/*.js',], // Rutas de tu aplicación que contienen documentación de Swagger
  };



//routes
const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions));
app.use(require('./routes/routes'))
app.use('/auth', authRoutes);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));;

app.listen(app.get('port'), () => {
    console.log(`Server is running on port: ${app.get('port')}`);
});
