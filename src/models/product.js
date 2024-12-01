const pool = require('../config/database');

const getProductBySKU = async (sku) => {
  const { rows } = await pool.query('SELECT * FROM public.products WHERE sku = $1', [sku]);
  return rows[0];
};
const insertProduct = async (product) => {
	console.log("product",product)
  const query = `
    INSERT INTO public.products (sku, name, category, description, launch_date, signature) 
    VALUES ($1, $2, $3, $4, $5, $6)`;
  const values = [
    product.sku,
    product.name,
    product.category,
    product.description,
    product.lanuch_date,
    product.signature,
  ];
  await pool.query(query, values);
};

const updateProduct = async (product) => {
  const query = `
    UPDATE public.products 
    SET name = $1, category = $2, description = $3, launch_date = $4, signature = $5 
    WHERE sku = $6`;
  const values = [
    product.name,
    product.category,
    product.description,
    product.lanuch_date,
    product.signature,
    product.sku,
  ];
  await pool.query(query, values);
};

module.exports = { getProductBySKU, insertProduct, updateProduct };
