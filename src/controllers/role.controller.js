const Role = require('../models/role.js');

const createRoles = async (req, res) => {
    const { name } = req.body
    try {
    //   // Count Documents
    //   const count = await Role.estimatedDocumentCount();
  
    //   // check for existing roles
    //   if (count > 0) return;
  
    //   // Create default Roles
    //   const values = await Promise.all([
    //     new Role({ name: "ADMIN" }).save(),
    //     new Role({ name: "EXTERNAL" }).save(),
    //   ]);
    console.log('name',name)
    const newRole = new Role({
        name
    })
    const roleSaved = await newRole.save()
    res.status(201).json(roleSaved);
  
    } catch (error) {
      console.error(error);
    }
  };
  
  module.exports = createRoles;