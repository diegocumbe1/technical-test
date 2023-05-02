const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Company = require('../models/company');
const Product = require('../models/products');
const {generatePDF, generatePDFCompany,sendEmailWithPDF}   = require('../utils/generatePDF');

////companies
router.post('/companies', async (req, res) => {
  const { name, address, nit, phone } = req.body;

  try {
    const company = new Company({ name, address, nit, phone });
    await company.save();
    res.json(company);
  } catch (err) {
    console.error(err);
    console.log('err.codeerr.code',err.code)
    if (err.code === 11000) {
      console.log('data',{ message: `${nit} ya existe. Intente con otro NIT.` })
      res.status(400).json({ message: `${nit} ya existe. Intente con otro NIT.` });
    } else {

      res.status(500).json({ message: err.message });
    }
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


 ////products

 router.get('/products', (req, res) =>{

  Product.find().populate('company', 'name')
    .then(products => {
      console.log('products', products);
      res.json(products);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    });

});

router.get('/products/:companyId', (req, res) =>{
  const { companyId } = req.params;

  Product.find({company:companyId})
    .then(products => {
      console.log('products', products);
      res.json(products);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    });

});

router.get('/products-company/:companyId', (req, res) =>{
  const { companyId } = req.params;

  Product.find({company:companyId})
    .then(products => {
      console.log('products', products);
      res.json(products);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    });

});

router.post('/product', async (req, res) => {
  const { name, image, stock, price, company } = req.body;

  try {
    const product = new Product({ name, image, stock, price, company });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    
      res.status(500).json({ message: err.message });
  }
});


 router.get('/download-pdf', async (req, res) => {
  try {
    const pdfBuffer = await generatePDF();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=list-inventory.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al generar el PDF');
  }
});

router.get('/download-pdf-company/:companyId', async (req, res) => {
  const { companyId } = req.params;
  
  try {
    const pdfBuffer = await generatePDFCompany(companyId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=list-inventory.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al generar el PDF');
  }
});
router.get('/send-email/:emailReceived', async (req, res) => {
  const { emailReceived } = req.params;
  
  try {
    await sendEmailWithPDF(emailReceived);
    res.send('Email sent successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al enviar correo');
  }
});




 module.exports = router;