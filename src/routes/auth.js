const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');

const Users = require('../models/users')


router.post('/create-user', async (req, res) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new Users({
    name,
    email,
    password: hashPassword,
    role
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'error creating user' });
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Obtiene una lista de todos los usuarios registrados
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('Credenciales inválidas');
    }

    // Omitimos la contraseña en la respuesta
    const { password: userPassword, ...userData } = user._doc;
    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post('/signup', (req, res) => {
  // Crear un nuevo usuario
});

router.get('/users', (req, res) =>{

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

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
