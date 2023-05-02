const mongoose = require('mongoose');


const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  nit: {
    type: String,
    required: true,
    unique: true,
    validate: {
        validator: function (v) {
          return /^\d{9}-\d{1}$/.test(v);
        },
        message: props => `${props.value} no es un NIT válido. El NIT de Colombia debe tener 10 dígitos y estar separado por un guión después de los primeros 9 dígitos.`,
      },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^([0-9]{8})|([0-9]{4}-[0-9]{4})$/.test(v);
      },
      message: props => `${props.value} no es un teléfono válido`,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
