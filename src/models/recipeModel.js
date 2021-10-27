const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const recipeCollection = await mongoConnection.connection()
    .then((db) => db.collection('recipes'));

  const { insertedId: _id } = await recipeCollection
  .insertOne({ name, ingredients, preparation, userId });

  return _id;
};

const getRecipes = async () => {
  const recipeCollection = await mongoConnection.connection()
    .then((db) => db.collection('recipes'));
  
  const recipes = await recipeCollection.find().toArray();

  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const recipeCollection = await mongoConnection.connection()
    .then((db) => db.collection('recipes'));

  const recipe = await recipeCollection.findOne(new ObjectId(id));

  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const recipeCollection = await mongoConnection.connection()
    .then((db) => db.collection('recipes'));

  const recipe = await recipeCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
  );

  if (!recipe) return null;

  return recipe.value;
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const recipeCollection = await mongoConnection.connection()
    .then((db) => db.collection('recipes'));
  
  const recipe = await recipeCollection.findOneAndDelete({ _id: new ObjectId(id) });

  if (!recipe) return null;

  return recipe.value;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
