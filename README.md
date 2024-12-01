# Task

This project processes product data from a CSV file and interacts with a PostgreSQL database. It supports reading data from a CSV file, generating a unique signature for each product, and inserting or updating product records in the database. Additionally, product history is tracked when changes occur.

## Features

- Process CSV files containing product data.
- Generate a unique SHA-256 signature for each product.
- Insert new products into the PostgreSQL database.
- Update existing products if their signature changes.
- Track changes in the product history.

## Prerequisites

Before running the project, make sure you have the following:

- Node.js (v14 or above)
- PostgreSQL database
- A `.env` file for database connection configuration

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>

2.Install the dependencies:
	```bash
	npm install
3.Create a .env file in the root directory with the following environment variables for database configuration:
	- DB_HOST=your-database-host
	- DB_USER=your-database-user
	- DB_PASSWORD=your-database-password
	- DB_NAME=your-database-name
	- DB_PORT=your-database-port
4. Run the project:
	node index.js