// Load environment variables from a .env file into process.env
require('dotenv').config(); 

// Import the `processCSV` function from the CSV processing service
const { processCSV } = require('./src/services/csvProcessor');

// Import utility functions for logging and error reporting
const { log, error } = require('./src/utils/logger');

// Define the file path to the CSV file to be processed
const filePath = './data/product.csv';

// Use an Immediately Invoked Function Expression (IIFE) for asynchronous code execution
(async () => {
  try {
    // Log a message indicating the start of CSV processing
    log('CSV processing started.');
    
    // Call the `processCSV` function to process the specified CSV file
    await processCSV(filePath);

    // Log a success message after the CSV processing is completed
    log('CSV processing completed successfully.');
  } catch (err) {
    // Log any errors that occur during the processing
    error(`Error during processing: ${err.message}`);
  }
})();
