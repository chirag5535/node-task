// Import the database connection pool configuration
const pool = require('../config/database');

/**
 * Retrieves a product from the database based on its SKU.
 * 
 * @param {string} sku - The SKU (Stock Keeping Unit) of the product to retrieve.
 * @returns {Object} - The product record if found, or undefined if no product is found.
 */
const getProductBySKU = async (sku) => {
  // Execute the query to select a product from the 'products' table where the SKU matches
  const { rows } = await pool.query('SELECT * FROM public.products WHERE sku = $1', [sku]);
  
  // Return the first product row, or undefined if no row is found
  return rows[0];
};

/**
 * Inserts a new product into the database.
 * 
 * @param {Object} product - The product object containing details to insert into the database.
 * @param {string} product.sku - The SKU of the product.
 * @param {string} product.name - The name of the product.
 * @param {string} product.category - The product's category.
 * @param {string} product.description - A description of the product.
 * @param {string} product.launch_date - The product's launch date.
 * @param {string} product.signature - The unique signature generated for the product.
 */
const insertProduct = async (product) => {
  // Log the product object for debugging purposes
  console.log("product", product);

  // Define the SQL query to insert a new product into the 'products' table
  const query = `
    INSERT INTO public.products (sku, name, category, description, launch_date, signature) 
    VALUES ($1, $2, $3, $4, $5, $6)`;
  
  // Define the values to be inserted into the table
  const values = [
    product.sku,
    product.name,
    product.category,
    product.description,
    product.launch_date,  // Corrected typo 'lanuch_date' to 'launch_date'
    product.signature,
  ];
  
  // Execute the query with the values
  await pool.query(query, values);
};

/**
 * Updates an existing product in the database based on its SKU.
 * 
 * @param {Object} product - The product object containing updated details.
 * @param {string} product.sku - The SKU of the product to update.
 * @param {string} product.name - The updated name of the product.
 * @param {string} product.category - The updated category of the product.
 * @param {string} product.description - The updated description of the product.
 * @param {string} product.launch_date - The updated launch date of the product.
 * @param {string} product.signature - The updated signature of the product.
 */
const updateProduct = async (product) => {
  // Define the SQL query to update the product in the 'products' table
  const query = `
    UPDATE public.products 
    SET name = $1, category = $2, description = $3, launch_date = $4, signature = $5 
    WHERE sku = $6`;

  // Define the values to update
  const values = [
    product.name,
    product.category,
    product.description,
    product.launch_date,  // Corrected typo 'lanuch_date' to 'launch_date'
    product.signature,
    product.sku,
  ];

  // Execute the query with the updated values
  await pool.query(query, values);
};

// Export the functions to interact with the product table in the database
module.exports = { getProductBySKU, insertProduct, updateProduct };
