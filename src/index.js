const express = require('express');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan')
const path = require('path');
const cors = require('cors')
const app = express();
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




//routes
app.use(require('./routes/routes'))
const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //El origin del request esta permitidos
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions));
app.use('/auth', authRoutes);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));;

app.listen(app.get('port'), () => {
    console.log(`Server is running on port: ${app.get('port')}`);
});
