const mongoConnection = require('./connection');

const createRecipe = async ({ name, ingredients, preparation, user }) => {
  const recipeCollection = await mongoConnection.connection()
    .then((db) => db.collection('recipes'));

  const { insertedId: _id } = await recipeCollection
  .insertOne({ name, ingredients, preparation, user });

  return _id;
};

const getRecipes = async () => {
  const recipeCollection = await mongoConnection.connection()
    .then((db) => db.collection('recipes'));
  
  const recipes = await recipeCollection.find().toArray();

  return recipes;
};

module.exports = {
  createRecipe,
  getRecipes,
};
