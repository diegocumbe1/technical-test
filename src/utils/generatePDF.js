const PdfPrinter = require('pdfmake');
const fs = require('fs');
const AWS = require('aws-sdk');

const Company = require('../models/company');
const Product = require('../models/products')

const printer = new PdfPrinter({
  Roboto: {
    normal: 'src/utils/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'src/utils/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'src/utils/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'src/utils/fonts/Roboto/Roboto-MediumItalic.ttf',
  },
});

async function generatePDF() {
  const products = await Product.find().populate('company', 'name');
  // const companies = await Product.findById(companies._id);
  const docDefinition = {
    content: [
      {
        text: 'Inventario de Productos',
        style: 'header',
      },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*', '*'],
          body: [
            ['Empresa', 'Nombre', 'Stock', 'Precio'],
            ...products.map((product) => [product.company.name, product.name, product.stock, product.price]),
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  return new Promise((resolve, reject) => {
    let chunks = [];
    pdfDoc.on('data', (chunk) => chunks.push(chunk));
    pdfDoc.on('end', () => {
      const pdf = Buffer.concat(chunks);
      resolve(pdf);
    });
    pdfDoc.end();
  });
}

async function generatePDFCompany(companyId) {
  const company = await Company.findById(companyId);
  const products = await Product.find({company:companyId});
  const docDefinition = {
    content: [
      {
        text: `Inventario de ${company.name}`,
        style: 'header',
      },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*', ],
          body: [
            ['Nombre', 'Stock', 'Precio'],
            ...products.map((product) => [product.name, product.stock, product.price]),
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  return new Promise((resolve, reject) => {
    let chunks = [];
    pdfDoc.on('data', (chunk) => chunks.push(chunk));
    pdfDoc.on('end', () => {
      const pdf = Buffer.concat(chunks);
      resolve(pdf);
    });
    pdfDoc.end();
  });
}

const generatePDFToSend = async () => {
  const products = await Product.find().populate('company', 'name');
  const docDefinition = {
    content: [
      {
        text: 'Inventario de Productos',
        style: 'header',
      },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*', '*'],
          body: [
            ['Empresa', 'Nombre', 'Stock', 'Precio'],
            ...products.map((product) => [product.company.name, product.name, product.stock, product.price]),
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  return new Promise((resolve, reject) => {
    let chunks = [];
    pdfDoc.on('data', (chunk) => chunks.push(chunk));
    pdfDoc.on('end', () => {
      const pdf = Buffer.concat(chunks);
      resolve(pdf);
    });
    pdfDoc.end();
  });
};
const sendEmailWithPDF = async (emailReceived) => {
  console.log('emailReceived',emailReceived)
  const pdfBuffer = await generatePDFToSend();
  const ses = new AWS.SES({ region: 'sa-east-1' }); // set your desired region
  const encodedPDF = pdfBuffer.toString('base64');

  const params = {
    RawMessage: {
      Data: `From: ${process.env.EMAIL}\nTo: ${emailReceived}\nSubject: Envio de inventario\nMIME-Version: 1.0\nContent-Type: multipart/mixed; boundary="mixed-boundary"\n\n--mixed-boundary\nContent-Type: multipart/alternative; boundary="alternative-boundary"\n\n--alternative-boundary\nContent-Type: text/plain; charset=UTF-8\n\nEnvio de inventario\n\n--alternative-boundary\nContent-Type: text/html; charset=UTF-8\n\n<html><body><h1>pdf de inventario</h1><p>aqui estau pdf del inventario.</p></body></html>\n\n--alternative-boundary--\n\n--mixed-boundary\nContent-Type: application/pdf; name="document.pdf"\nContent-Transfer-Encoding: base64\nContent-Disposition: attachment; filename="inventario.pdf"\n\n${encodedPDF}\n\n--mixed-boundary--`,
    },
  };

  return new Promise((resolve, reject) => {
    ses.sendRawEmail(params, (err, data) => {
      console.log('params',params)
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log('Email sent:', data);
        resolve(data);
      }
    });
  });
};



// const sendEmailWithPDF = async (emailReceved) => {
//   const pdfBuffer = await generatePDFToSend();
//   const ses = new AWS.SES({ region: 'sa-east-1' }); // set your desired region
//   const params = {
//     RawMessage: {
//       Data: pdfBuffer,
//     },
//     Destinations: [emailReceved],
//     Source: process.env.EMAIL,
//     FromArn: process.env.AWS_SES,
//     ReturnPathArn: 'process.env.AWS_SES',
//     SourceArn: process.env.AWS_SES,
//     Tags: [
//       {
//         Name: 'pdf',
//         Value: 'inventory-pdf',
//       },
//     ],
//   };
//   return new Promise((resolve, reject) => {
//     ses.sendRawEmail(params, (err, data) => {
//       if (err) {
//         console.log(err);
//         reject(err);
//       } else {
//         console.log('Email sent:', data);
//         resolve(data);
//       }
//     });
//   });
// };


module.exports = {generatePDF,generatePDFCompany,sendEmailWithPDF};
