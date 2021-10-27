const mongoConnection = require('./connection');

const createRecipe = async ({ name, ingredients, preparation, user }) => {
  const recipeCollection = await mongoConnection.connection()
    .then((db) => db.collection('recipes'));

  const { insertedId: _id } = await recipeCollection
  .insertOne({ name, ingredients, preparation, user });

  return _id;
};

module.exports = {
  createRecipe,
};
