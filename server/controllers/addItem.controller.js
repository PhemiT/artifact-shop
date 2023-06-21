var itemModel = require('../models/itemModel');

const addItem = async (res, req, next) => {
    /* const data = new itemModel({
        name: req.body.name,
        image: req.body.image,
        desc: req.body.desc,
        price: req.body.price,
        collectorName: req.body.collectorName
    }) */

    try {
        const dataToSave = await itemModel.create(req.body)
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}