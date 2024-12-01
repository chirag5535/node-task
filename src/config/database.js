// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import the 'Pool' class from the 'pg' module to manage PostgreSQL database connections
const { Pool } = require('pg');

// Create a new pool of connections to the PostgreSQL database using configuration from environment variables
const pool = new Pool({
  host: process.env.DB_HOST,          // The host address of the database
  user: process.env.DB_USER,          // The database username
  password: process.env.DB_PASSWORD,  // The database user's password
  database: process.env.DB_NAME,      // The name of the database to connect to
  port: process.env.DB_PORT,          // The port on which the database is listening
  ssl: { rejectUnauthorized: false }  // SSL configuration, useful for secure connections (e.g., on Heroku)
});

// Export the pool instance for use in other parts of the application
module.exports = pool;
