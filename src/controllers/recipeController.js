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

module.exports = {
  createRecipe,
  getRecipes,
};
