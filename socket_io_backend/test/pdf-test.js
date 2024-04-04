const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();

doc.pipe(fs.createWriteStream('/pdf-folder/file3.pdf')); // write to PDF
//doc.pipe(res);                                       // HTTP response

// add stuff to PDF here using methods described below...

doc.text('Phinahas Co.', {
  align: 'center'
});
// Move down to a suitable position for the invoice number and date
doc.moveDown();

doc.width(200)
  .text('Invoice: 123', {
    align: 'left'
  })
  .text('Date: 12/12/2023', {
    align: 'right'
  });
// finalize the PDF and end the stream
doc.end();