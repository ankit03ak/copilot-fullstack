const generationModel = require('../models/generationModel');
const languageModel = require('../models/languageModel');
const { generateCodeFromAI } = require('./aiService');

async function generateAndSave({ prompt, language, userId = null }) {
 
  const code = await generateCodeFromAI(prompt, language);

  const normalizedCode = language.toLowerCase();
  const langRow = await languageModel.findByCode(normalizedCode);

  const languageId = langRow ? langRow.id : null;

  const generation = await generationModel.createGeneration({
    prompt,
    language,
    code,
    languageId,
    userId
  });

  return generation;
}

async function getHistoryPage({ page, pageSize }) {
  return generationModel.getGenerations({ page, pageSize });
}

module.exports = {
  generateAndSave,
  getHistoryPage
};
