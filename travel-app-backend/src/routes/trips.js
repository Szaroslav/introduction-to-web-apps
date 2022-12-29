const express = require('express');
const router = express.Router();
const dbo = require('../database/conn');

router.get('/', (_, res) => {
    const db = dbo.getDatabase();

    db.collection('Trips').find().toArray((err, result) => {
        if (err)
            res.status(400).send('Error fetching trips');
        else
            res.json(result);
    });
});

router.get('/:id', (req, res) => {
    const db = dbo.getDatabase();
    const { id } = req.params;

    db.collection('Trips').find({ id: parseInt(id) }).toArray((err, result) => {
        if (err)
            res.status(400).send('Error fetching trip');
        else
            res.json(result);
    });
});

router.put('/', (req, res) => {
    const db = dbo.getDatabase();
    const newTrip = {
        id: req.body.id,
        name: req.body.name,
        country: req.body.country,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        unitPrice: req.body.unitPrice,
        spotsNumber: req.body.spotsNumber,
        purchasedSpotsNumber: req.body.purchasedSpotsNumber,
        description: req.body.description,
        images: req.body.images,
        reviews: req.body.reviews
    };

    db.collection('Trips').insertOne(newTrip, (err, result) => {
        if (err) {
            res.status(400).send('Error inserting trip!');
        } 
        else {
            console.log(`Added a new trip with id ${result.insertedId}`);
            res.status(204).send();
        }
    })
});

router.post('/:id', (req, res) => {
    const db = dbo.getDatabase();
    const newTrip = {
        id: req.body.id,
        name: req.body.name,
        country: req.body.country,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        unitPrice: req.body.unitPrice,
        spotsNumber: req.body.spotsNumber,
        purchasedSpotsNumber: req.body.purchasedSpotsNumber,
        description: req.body.description,
        images: req.body.images,
        reviews: req.body.reviews
    };
    const { id } = req.params;

    db.collection('Trips').updateOne({ id: parseInt(id) }, { $set: newTrip }, (err, _) => {
        if (err)
            res.status(400).send('Error updating trip!');
        else
            res.status(204).send();
    })
});

router.delete('/:id', (req, res) => {
    const db = dbo.getDatabase();
    const { id } = req.params;

    db.collection('Trips').deleteOne({ id: parseInt(id) }, (err, _) => {
        if (err)
            res.status(400).send(`Error deleting trip with id ${id}!`);
        else
            res.status(204).send();
    });
});

module.exports = router;