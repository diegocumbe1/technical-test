const PdfPrinter = require('pdfmake');
const fs = require('fs');

const Company = require('../models/company');

const printer = new PdfPrinter({
  Roboto: {
    normal: 'src/utils/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'src/utils/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'src/utils/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'src/utils/fonts/Roboto/Roboto-MediumItalic.ttf',
  },
});

async function generatePDF() {
  const companies = await Company.find();
  const docDefinition = {
    content: [
      {
        text: 'Listado de empresas',
        style: 'header',
      },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: ['auto', '*', '*', '*'],
          body: [
            ['Nombre', 'Dirección', 'NIT', 'Teléfono'],
            ...companies.map((company) => [company.name, company.address, company.nit, company.phone]),
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

module.exports = generatePDF;
