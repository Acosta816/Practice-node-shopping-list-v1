
const express = require('express');
// we'll use morgan to log the HTTP layer
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();

const shoppingListRouter = require('./shoppingListRouter');

const {Recipes} = require('./models');




// log the http layer
app.use(morgan('common'));
app.use(jsonParser);
app.use('/shopping-list', shoppingListRouter);

Recipes.create('chilliDogs', ["chili", "buns", "botswert dogs", "mustard", "ketchup"]);
Recipes.create('orchata', ['rice', 'dates', 'real vanilla extract']);

app.get('/recipes', (req,res) => {
  console.log("recipes gettn the current recipes :D");
  res.json(Recipes.get());
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
