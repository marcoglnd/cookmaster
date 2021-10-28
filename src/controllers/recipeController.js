const recipeService = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user: { _id } } = req;
  const response = await recipeService.createRecipe(
    name, ingredients, preparation, _id,
  );
  
  if (response && response.message) {
    return res.status(400).json(response);
  }

  res.status(201).json({ recipe: { name, ingredients, preparation, userId: _id, _id: response } });
};

const getRecipes = async (req, res) => {
  const response = await recipeService.getRecipes();

  if (!response) {
    return res.status(400).json({ message: 'Recipes not found' });
  }

  res.status(200).json(response);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const response = await recipeService.getRecipeById(id);

  if (!response) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  res.status(200).json(response);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const response = await recipeService.updateRecipe(id, name, ingredients, preparation);

  if (!response) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  res.status(200).json(response);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const response = await recipeService.deleteRecipe(id);

  if (!response) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  res.status(204).send();
};

const uploadImage = async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  // if (req.fileValidationError) {
  //   return res.status(403).json({ error: { message: 'Extension must be `jpeg`' } });
  // }

  const response = await recipeService.uploadImage(id, file);

  // if (!response) {
  //   return res.status(404).json({ message: 'recipe not found' });
  // }

  res.status(200).json(response);
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
