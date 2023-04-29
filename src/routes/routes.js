const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const generatePDF   = require('../utils/generatePDF');


router.post('/companies', async (req, res) => {
  const { name, address, nit, phone } = req.body;

  try {
    const company = new Company({ name, address, nit, phone });
    await company.save();
    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get('/companies', (req, res) =>{

   Company.find()
     .then(companies => {
       console.log('companies', companies);
       res.json(companies);
     })
     .catch(err => {
       console.error(err);
       res.status(500).json({ error: 'An error occurred' });
     });
 
 });

 router.get('/download-pdf', async (req, res) => {
  try {
    const pdfBuffer = await generatePDF();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=list-companies.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al generar el PDF');
  }
});


//  router.get('/', (req, res) => {
//     res.send('hello lite thinking');
//  });

 module.exports = router;