// Import the built-in 'fs' module for file system operations
const fs = require('fs');

// Import the 'csv-parser' module for parsing CSV files
const csv = require('csv-parser');

// Import model functions for interacting with the product and product history data
const { getProductBySKU, insertProduct, updateProduct } = require('../models/product');
const { insertProductHistory } = require('../models/productHistory');

// Import the function to generate a unique signature for each product
const { generateSignature } = require('./signatureGenerator');

/**
 * Processes a CSV file containing product data.
 * For each row in the CSV:
 * - If the product doesn't exist, it inserts a new product.
 * - If the product exists but the signature has changed, it inserts a product history record and updates the product.
 * 
 * @param {string} filePath - Path to the CSV file to be processed.
 */
const processCSV = async (filePath) => {
  // Initialize an array to store the rows of the CSV file
  const rows = [];

  // Create a readable stream from the CSV file and pipe it to the csv-parser
  fs.createReadStream(filePath)
    .pipe(csv()) // csv-parser automatically skips the header row
    .on('data', (data) => rows.push(data)) // Push each row of data into the rows array
    .on('end', async () => {
      // Process each row after the CSV file is fully read
      for (const row of rows) {
        // Generate a unique signature for the current row
        const signature = generateSignature(row);

        // Check if a product with the same SKU already exists in the database
        const existingProduct = await getProductBySKU(row.sku);

        if (!existingProduct) {
          // If the product doesn't exist, insert it into the database with the generated signature
          await insertProduct({ ...row, signature });
        } else if (existingProduct.signature !== signature) {
          // If the product exists but the signature has changed, update the product and record its history
          await insertProductHistory(existingProduct); // Insert a product history record
          await updateProduct({ ...row, signature }); // Update the product with the new data and signature
        }
      }

      // Log a message indicating that CSV processing is complete
      console.log('CSV processing complete.');
    });
};

// Export the processCSV function for use in other modules
module.exports = { processCSV };
