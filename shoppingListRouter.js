const express = require('express');
const router = express.Router();

const {ShoppingList} = require('./models');



ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);


  router.get('/', (req, res) => {
    console.log("hello",req.body);
    res.json(ShoppingList.get());
  });
  
  router.post('/', (req,res, next) => {
    console.log(req.body);
    
    if(!req.body.name || !req.body.budget){
      return res.status(400).send("missing a key for shoppinglist item in request body")
    } 
    const {name, budget} = req.body;
    const newItem = ShoppingList.create(name, budget);
    console.log(newItem);
    res.status(201).json(newItem);
  });
  
  router.delete('/:id', (req,res) => {
    console.log(req.params);
    if(!ShoppingList.items[req.params.id]){
      return res.status(400).send("that item id does not exist");
    }
    console.log("here's the item you're deleting", ShoppingList.items[req.params.id]);
    ShoppingList.delete(req.params.id);
    res.status(204).send(`cool, item with id: ${req.params.id} deleted`); 
  } )


  module.exports = router;