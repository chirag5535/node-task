const crypto = require('crypto');

const generateSignature = (row) => {
  const dataString = `${row.sku}|${row.name}|${row.category}|${row.description}|${row.launch_date}`;
  return crypto.createHash('sha256').update(dataString).digest('hex');
};

module.exports = { generateSignature };
