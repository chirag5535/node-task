// Import the built-in 'fs' module for working with the file system
const fs = require('fs');

// Import the 'csv-parser' module for parsing CSV files
const csv = require('csv-parser');

// Import model functions for interacting with the product and product history tables in the database
const { getProductBySKU, insertProduct, updateProduct } = require('../models/product');
const { insertProductHistory } = require('../models/productHistory');

// Import the signature generator to create unique signatures for each product
const { generateSignature } = require('./signatureGenerator');

// Import the logger utility for logging information, warnings, and errors
const logger = require('../utils/logger');

/**
 * Processes a CSV file containing product data.
 * For each row in the CSV:
 * - If a critical column is empty, the row is skipped, and a warning is logged.
 * - If the product is new, it is inserted into the database.
 * - If the product exists but has changes, its history is recorded, and the product is updated.
 *
 * @param {string} filePath - The file path of the CSV file to process.
 */
const processCSV = async (filePath) => {
  // Initialize an array to hold rows from the CSV file
  const rows = [];

  // Read the CSV file as a stream and parse each row
  fs.createReadStream(filePath)
    .pipe(csv()) // Use csv-parser to parse the CSV file
    .on('data', (data) => {
      // Check if any critical fields (columns) are missing or empty
      if (!data.sku || !data.name || !data.category || !data.description || !data.launch_date) {
        // Log a warning and skip the row if it contains empty critical fields
        logger.warn(`Skipping row with missing fields: ${JSON.stringify(data)}`);
        return;
      }
      // Add valid rows to the rows array for further processing
      rows.push(data);
    })
    .on('end', async () => {
      // Process each row after the CSV file has been fully read
      for (const row of rows) {
        try {
          // Generate a unique signature for the current row of data
          const signature = generateSignature(row);

          // Check if a product with the same SKU already exists in the database
          const existingProduct = await getProductBySKU(row.sku);

          if (!existingProduct) {
            // If the product doesn't exist, insert it into the database
            await insertProduct({ ...row, signature });
            logger.log(`Inserted new product: ${row.sku}`);
          } else if (existingProduct.signature !== signature) {
            // If the product exists but has changes, record its history and update it
            await insertProductHistory(existingProduct); // Insert a product history record
            await updateProduct({ ...row, signature }); // Update the product with the new data
            logger.log(`Updated product: ${row.sku}`);
          }
        } catch (error) {
          // Log an error if any exception occurs during processing
          logger.error(`Error processing row: ${JSON.stringify(row)} - ${error.message}`);
        }
      }

      // Log a message indicating that the CSV file has been fully processed
      logger.log('CSV processing complete.');
    })
    .on('error', (error) => {
      // Log an error if there is an issue reading the CSV file
      logger.error(`Error reading CSV file: ${error.message}`);
    });
};

// Export the processCSV function for use in other modules
module.exports = { processCSV };
