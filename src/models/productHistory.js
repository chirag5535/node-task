// Import the database connection pool configuration
const pool = require('../config/database');

/**
 * Inserts a product's history record into the database.
 * This is used to track changes or updates to a product.
 * 
 * @param {Object} product - The product object containing details to store in the history table.
 * @param {number} product.id - The unique ID of the product.
 * @param {string} product.sku - The SKU of the product.
 * @param {string} product.name - The name of the product.
 * @param {string} product.category - The category of the product.
 * @param {string} product.description - A description of the product.
 * @param {string} product.launch_date - The launch date of the product.
 * @param {string} product.signature - The unique signature of the product.
 */
const insertProductHistory = async (product) => {
  // Define the SQL query to insert a record into the 'products_history' table
  const query = `
    INSERT INTO public.products_history 
    (product_id, product_sku, product_name, product_category, product_description, product_launch_date, signature, updated_at) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`;

  // Define the values to insert into the history table
  const values = [
    product.id,          // The product's unique ID
    product.sku,         // The SKU of the product
    product.name,        // The name of the product
    product.category,    // The category of the product
    product.description, // The description of the product
    product.launch_date, // The launch date of the product
    product.signature,   // The signature of the product
  ];

  // Execute the query with the provided values
  await pool.query(query, values);
};

// Export the insertProductHistory function for use in other modules
module.exports = { insertProductHistory };
