const db = require('../config/db');

async function findByCode(code) {
  const { rows } = await db.query(
    'SELECT * FROM languages WHERE code = $1',
    [code]
  );
  return rows[0] || null;
}

module.exports = {
  findByCode
};
