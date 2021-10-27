const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const validateJWT = require('./auth/validateJWT');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.post('/users', userController.createUser);

app.post('/login', userController.login);

app.post('/recipes', validateJWT, recipeController.createRecipe);

app.get('/recipes', recipeController.getRecipes);

module.exports = app;
