const fs = require('fs');
const csv = require('csv-parser');
const { getProductBySKU, insertProduct, updateProduct } = require('../models/product');
const { insertProductHistory } = require('../models/productHistory');
const { generateSignature } = require('./signatureGenerator');

const processCSV = async (filePath) => {
  const rows = [];
  fs.createReadStream(filePath)
    .pipe(csv()) // csv-parser automatically skips the header row
    .on('data', (data) => rows.push(data))
    .on('end', async () => {
      for (const row of rows) {
        const signature = generateSignature(row);
        const existingProduct = await getProductBySKU(row.sku);
        if (!existingProduct) {
          await insertProduct({ ...row, signature });
        } else if (existingProduct.signature !== signature) {
          await insertProductHistory(existingProduct);
          await updateProduct({ ...row, signature });
        }
      }
      console.log('CSV processing complete.');
    });
};

module.exports = { processCSV };
