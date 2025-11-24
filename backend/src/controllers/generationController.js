const generationService = require('../services/generationService');
const generationModel = require("../models/generationModel");

async function generateCode(req, res, next) {
  try {
    const { prompt, language } = req.body;

    if (!prompt || !language) {
      const err = new Error('prompt and language are required');
      err.status = 400;
      throw err;
    }

    const generation = await generationService.generateAndSave({
      prompt,
      language,
      userId: null 
    });

    res.status(201).json({
      id: generation.id,
      prompt: generation.prompt,
      language: generation.language,
      code: generation.code,
      isFavorite: generation.is_favorite,
      createdAt: generation.created_at
    });
  } catch (err) {
    next(err);
  }
}

async function getHistory(req, res, next) {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const pageSize = parseInt(req.query.pageSize || '10', 10);

    const result = await generationService.getHistoryPage({ page, pageSize });

    res.json({
      items: result.items.map(row => ({
        id: row.id,
        prompt: row.prompt,
        language: row.language,
        code: row.code,
        languageCode: row.language_code,
        isFavorite: row.is_favorite,
        createdAt: row.created_at
      })),
      pagination: {
        page: result.page,
        pageSize: result.pageSize,
        total: result.total,
        totalPages: result.totalPages
      }
    });
  } catch (err) {
    next(err);
  }
}


async function deleteGeneration(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      const err = new Error('Invalid id');
      err.status = 400;
      throw err;
    }

    const deleted = await generationModel.deleteById(id);
    if (!deleted) {
      const err = new Error('Generation not found');
      err.status = 404;
      throw err;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function deleteAllGenerations(req, res, next) {
  try {
    await generationModel.deleteAll();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}



async function updateFavorite(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const { isFavorite } = req.body;

    if (Number.isNaN(id)) {
      const err = new Error("Invalid id");
      err.status = 400;
      throw err;
    }

    if (typeof isFavorite !== "boolean") {
      const err = new Error("isFavorite must be boolean");
      err.status = 400;
      throw err;
    }

    const updated = await generationModel.updateFavorite(id, isFavorite);
    if (!updated) {
      const err = new Error("Generation not found");
      err.status = 404;
      throw err;
    }

    res.json({
      id: updated.id,
      isFavorite: updated.is_favorite
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  generateCode,
  getHistory,
  deleteGeneration,
  deleteAllGenerations,
  updateFavorite
};
