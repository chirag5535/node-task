const pool = require('../config/database');

const insertProductHistory = async (product) => {
  const query = `
    INSERT INTO public.products_history 
    (product_id, product_sku, product_name, product_category, product_description, product_launch_date, signature, updated_at) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`;
  const values = [
    product.id,
    product.sku,
    product.name,
    product.category,
    product.description,
    product.launch_date,
    product.signature,
  ];
  await pool.query(query, values);
};

module.exports = { insertProductHistory };
