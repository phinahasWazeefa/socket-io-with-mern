const puppeteer = require('puppeteer');

async function generatePDF(htmlContent, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the content of the page with the provided HTML
  await page.setContent(htmlContent);

  // Generate PDF from the page content
  await page.pdf({ path: outputPath, format: 'A4' });

  await browser.close();
}


const htmlContentHeader = `
  <div style="display: flex; justify-content: center; align-items: center;">
    <img src="https://marketplace.canva.com/EAFauoQSZtY/1/0/1600w/canva-brown-mascot-lion-free-logo-qJptouniZ0A.jpg" alt="Company Logo" style="width: 50px; height: auto; margin-right: 10px;">
    <br/>
    <h5>PHINAHS Co.</h5>
  </div>
`;

const invoiceDate = `<div style="display:flex;justify-content:space-between;align-items:center;text-align:center"><h6>Invoice ${10923}</h6><h6>Date ${"12/12/2023"}</h6></div>`;

const table = `<div>

<table>
<thead>
  <tr>
    <th>Service</th>
    <th>Amount</th>
    <th>Tax</th>
    <th>Total Amount</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>House Cleaning</td>
    <td>$100.00</td>
    <td>$50.00</td>
    <td>$150.00</td>
  </tr>
</tbody>
</table>

</div>`;

// Example usage
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }

    h2 {
      color: #333;
    }
  </style>
</head>
<body>

  ${htmlContentHeader}
  ${invoiceDate}
  ${table}

  
</body>
</html>`
const outputPath = '/pdf-folder/invoice10957.pdf';

generatePDF(htmlContent, outputPath)
  .then(() => console.log('PDF generated successfully'))
  .catch((error) => console.error('Error generating PDF:', error));
