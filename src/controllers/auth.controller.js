const jwt = require('jsonwebtoken');
const Users = require('../models/users.js');
const  bcrypt= require('bcrypt');
// import Role = require('../models/Role.js";

const signupHandler = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Creating a new User Object
    const newUser = new Users({
      name,
      email,
      password:hashPassword,
      role
    });
    console.log('newUser',newUser)

    // if (role) {
    //   const foundRoles = await Role.find({ name: { $in: roles } });
    //   newUser.role = foundRoles.map((role) => role._id);
    // } else {
    //   const role = await Role.findOne({ name: "EXTERNAL" });
    //   newUser.role = role._id;
    // }

    console.log('')

    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const signinHandler = async (req, res) => {
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
    // res.json(userData);
    const token = jwt.sign({ id: userData._id }, process.env.SECRET, {
    expiresIn: 86400, // 24 hours
    });
     res.json({ userData,token });
  } catch (err) {
  console.error(err);
  res.status(500).json({ message: err.message });
}

  // try {
  //   // Request body email can be an email or username
  //   const userFound = await User.findOne({ email: req.body.email }).populate(
  //     "role"
  //   );

  //   if (!userFound) return res.status(400).json({ message: "User Not Found" });

  //   // const matchPassword = await User.comparePassword(
  //   //   req.body.password,
  //   //   userFound.password
  //   // );
  //   const matchPassword = await bcrypt.compare(password, user.password);


  //   if (!matchPassword)
  //     return res.status(401).json({
  //       token: null,
  //       message: "Invalid Password",
  //     });

  //   const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
  //     expiresIn: 86400, // 24 hours
  //   });

  //   res.json({ token });
  // } catch (error) {
  //   console.log(error);
  // }
};
module.exports = {
  signupHandler,
  signinHandler,
};