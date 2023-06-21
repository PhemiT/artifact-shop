const express = require('express');
const addItemController = require('../controllers/addItem.controller.js');
const router = express.Router()
var itemModel = require('../models/itemModel')

//Post Method
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
  

//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;