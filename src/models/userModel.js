// const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const createUser = async ({ name, email, password }) => {
  const userCollection = await mongoConnection.connection()
    .then((db) => db.collection('users'));

  const { insertedId: _id } = await userCollection
  .insertOne({ name, email, role: 'user', password });

  return _id;
};

const findEmail = async ({ email }) => {
  const userCollection = await mongoConnection.connection()
    .then((db) => db.collection('users'));
  
  const user = await userCollection.findOne({ email });

  return user;
};

module.exports = {
  createUser,
  findEmail,
};
