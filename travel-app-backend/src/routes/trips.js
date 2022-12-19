const express = require('express');
const router = express.Router();
const firebase = require('../firebase');

router.get('/', (req, res) => {
    console.log(firebase.database());
    res.send('Hey!');
});

module.exports = router;