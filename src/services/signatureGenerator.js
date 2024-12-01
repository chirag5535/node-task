// Import the built-in Node.js 'crypto' module for cryptographic operations
const crypto = require('crypto');

/**
 * Generates a unique SHA-256 hash signature for a given row of data.
 * 
 * @param {Object} row - An object containing product data fields.
 * @param {string} row.sku - The product's unique Stock Keeping Unit (SKU).
 * @param {string} row.name - The name of the product.
 * @param {string} row.category - The category of the product.
 * @param {string} row.description - A description of the product.
 * @param {string} row.launch_date - The launch date of the product.
 * 
 * @returns {string} - A SHA-256 hash as a hexadecimal string, representing the unique signature.
 */
const generateSignature = (row) => {
  // Concatenate the row fields into a single string with a '|' separator for consistency
  const dataString = `${row.sku}|${row.name}|${row.category}|${row.description}|${row.launch_date}`;

  // Create a SHA-256 hash of the concatenated string and return its hexadecimal representation
  return crypto.createHash('sha256').update(dataString).digest('hex');
};

// Export the generateSignature function for use in other modules
module.exports = { generateSignature };
