const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({
  connectionString
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
