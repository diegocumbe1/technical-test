const express = require('express');
const passport = require('passport');

const bcrypt = require('bcrypt');


const Users = require('../models/users')

const  {
  signinHandler,
  signupHandler,
} = require('../controllers/auth.controller.js');
const createRoles = require('../controllers/role.controller.js')

const router = express.Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
/**
 * @swagger
 * /create-user:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario con los datos proporcionados
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       description: Datos del nuevo usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error de validación de datos
 *       500:
 *         description: Error interno del servidor
 * 
 * components:
 *   schemas:
 *     User:
        $ref: 'src/models/users.js#/  userSchema'
*/


// router.post('/create-user', async (req, res) => {
//   const { name, email, password, role } = req.body;

//   const salt = await bcrypt.genSalt(10);
//   const hashPassword = await bcrypt.hash(password, salt);

//   const user = new Users({
//     name,
//     email,
//     password: hashPassword,
//     role
//   });

//   try {
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: 'error creating user' });
//   }
// });


// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await Users.findOne({ email });
//     if (!user) {
//       throw new Error('Credenciales inválidas');
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       throw new Error('Credenciales inválidas');
//     }

//     // Omitimos la contraseña en la respuesta
//     const { password: userPassword, ...userData } = user._doc;
//     res.json(userData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// });

router.post('auth/signup', (req, res) => {
  // Crear un nuevo usuario
});

router.get('auth/users', (req, res) =>{

  Users.find()
    .then(users => {
      console.log('users', users);
      res.json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    });

});

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });
router.post("/create-roles",createRoles);
router.post("/signup",signupHandler);

router.post("/signin", signinHandler);

module.exports = router;
