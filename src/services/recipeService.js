const recipeModel = require('../models/recipeModel');

const validations = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return ({
      message: 'Invalid entries. Try again.',
    });
  }
  return null;
};

const createRecipe = async (name, ingredients, preparation, user) => {
  const error = validations(name, ingredients, preparation);
  if (error) return error;
  const id = await recipeModel.createRecipe({ name, ingredients, preparation, user });
  return id;
};

const getRecipes = async () => {
  const recipes = await recipeModel.getRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await recipeModel.getRecipeById(id);
  return recipe;
};

module.exports = { 
  createRecipe,
  getRecipes,
  getRecipeById,
};
