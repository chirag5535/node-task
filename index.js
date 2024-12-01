require('dotenv').config();
const { processCSV } = require('./src/services/csvProcessor');
const { log, error } = require('./src/utils/logger');
const filePath = './data/product.csv';

(async () => {
  try {
    log('CSV processing complete.');
    await processCSV(filePath);
    log('CSV processing completed successfully.');
  } catch (error) {
    error(`Error during processing: ${error.message}`);
  }
})();
