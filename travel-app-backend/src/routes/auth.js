require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const dbo = require('../database/conn');
const token = require('../auth/token');

const router = express.Router();

router.post('/login', async (req, res) => {
    const db = dbo.getDatabase();
    const { userId, password } = req.body;

    if (!userId || !password)
        return res.sendStatus(400);

    const doc = await db
        .collection('Users')
        .findOne(userId.includes('@') ? { email: userId } : { username: userId });

    if (!doc)
        return res.status(400).send('Cannot find the user');
    
    try {
        if (!await bcrypt.compare(password, doc.password))
            return res.status(400).send('Wrong password');
    }
    catch (e) {
        return res.status(500).send(e);
    }

    const user = { id: userId };
    const accessToken = token.generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    dbo.getDatabase().collection('RefreshTokens').insertOne({ value: refreshToken });
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const db = dbo.getDatabase();
    
        if (!validator.isEmail(email))
            res.status(400).send('Email is not valid');
    
        db.collection('Users').insertOne({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            city: req.body.city,
            postalCode: req.body.postalCode,
            country: req.body.country,
            permissionsLevel: 1
        });

        res.status(204).send(`User ${req.body.username} has been registred`);
    }
    catch {
        res.status(500).send();
    }

});

router.post('/token', async (req, res) => {
    const refreshToken = req.body.token;

    if (!refreshToken)
        return res.sendStatus(401);
    if (!await dbo.getDatabase().collection('RefreshTokens').findOne({ value: refreshToken }))
        return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        
        const accessToken = token.generateAccessToken({ id: user.id });
        res.json({ accessToken: accessToken });
    })
});

module.exports = router;