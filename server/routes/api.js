const express = require('express');
const router = express.Router();
var itemModel = require('../models/itemModel');

//Post new item
router.post('/add-item', (req, res) => {
    console.log(req.body)
    const newItem = new itemModel({
      name: req.body.name,
      image: req.body.image,
      desc: req.body.desc,
      price: req.body.price,
      collectorName: req.body.collectorName
    });
  
    newItem.save()
      .then(savedItem => {
        res.send(savedItem);
      })
      .catch(err => {
        console.log(err)
        res.status(500).send('Error saving item');
      });
  });

// Search items
router.post('/search-items', async (req, res) => {
  const query = new RegExp('^' + req.body.query, 'i');
  const allItems = await itemModel.find({name: { $regex: query }});
  if (!allItems || allItems.length === 0) {
    res.status(400).send({err: "No item found"});
    return;
  }
  res.status(200).send(allItems);
});
  
//Get all items
router.get('/get-items', (req, res) => {
    itemModel.find()
    .then(items => {
      res.json(items);
    })
    .catch(err => {
      res.status(500).send('Error retrieving items');
    });
  });

//Get one item by ID
router.get('/get-one-item/:id', (req, res) => {
  const itemId = req.params.id;
  Item.findById(itemId)
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      res.status(500).send('Error retrieving item');
    });
});

//Update by ID Method
router.patch('/update/:id', (req, res) => {
  const itemId = req.params.id;

  const update = {
    name: req.body.name,
    image: req.body.image,
    desc: req.body.desc,
    price: req.body.price,
    collectorName: req.body.collectorName
  };

  Item.findByIdAndUpdate(itemId, update, { new: true })
    .then(updatedItem => {
      res.send(updatedItem);
    })
    .catch(err => {
      res.status(500).send('Error updating item');
    });
});


//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
  const itemId = req.params.id;
  Item.findByIdAndDelete(itemId)
    .then(deletedItem => {
      res.send(deletedItem);
    })
    .catch(err => {
      res.status(500).send('Error deleting item');
    });
});


module.exports = router;