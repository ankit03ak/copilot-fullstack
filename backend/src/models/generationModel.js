const db = require('../config/db');

async function createGeneration({ prompt, language, code, languageId = null, userId = null }) {
  const query = `
    INSERT INTO generations (prompt, language, code, language_id, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, prompt, language, code, language_id, user_id, created_at
  `;
  const values = [prompt, language, code, languageId, userId];

  const { rows } = await db.query(query, values);
  return rows[0];
}

async function getGenerations({ page = 1, pageSize = 10 }) {
  const limit = pageSize;
  const offset = (page - 1) * pageSize;

  const listQuery = `
    SELECT g.id, g.prompt, g.language, g.code, g.is_favorite, g.created_at, l.code AS language_code
    FROM generations g
    LEFT JOIN languages l ON g.language_id = l.id
    ORDER BY g.created_at DESC
    LIMIT $1 OFFSET $2
  `;

  const countQuery = `SELECT COUNT(*) AS total FROM generations`;

  const [listResult, countResult] = await Promise.all([
    db.query(listQuery, [limit, offset]),
    db.query(countQuery)
  ]);

  const items = listResult.rows;
  const total = parseInt(countResult.rows[0].total, 10);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize)
  };
}

async function deleteById(id) {
  const result = await db.query(
    'DELETE FROM generations WHERE id = $1',
    [id]
  );
  return result.rowCount > 0;
}

async function deleteAll() {
  await db.query('DELETE FROM generations');
}

async function updateFavorite(id, isFavorite) {
  const { rows } = await db.query(
    `
    UPDATE generations
    SET is_favorite = $2
    WHERE id = $1
    RETURNING id, prompt, language, code, language_id, user_id, is_favorite, created_at
    `,
    [id, isFavorite]
  );

  return rows[0] || null;
}

module.exports = {
  createGeneration,
  getGenerations,
  deleteById,
  deleteAll,
  updateFavorite
};
