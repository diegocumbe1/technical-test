// const express = require('express');
// const morgan = require('morgan');
// const path = require('path');
// require('dotenv').config();

// const app = express();

// // Db connection
// const { mongoose } = require('./database');

// // Settings 
// app.set('port', process.env.PORT || 3000);

// // Middlewares
// app.use(morgan('dev'));
// app.use(express.json());

// // Routes
// app.use('/api/tasks', require('./routes/task.routes'));



// // Starting the server
// app.listen(app.get('port'), () => {
//   console.log(`Server on port ${app.get('port')}`);
// });

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan')
const path = require('path');
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
app.use('/auth', authRoutes);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));;

app.listen(app.get('port'), () => {
    console.log(`Server is running on port: ${app.get('port')}`);
});