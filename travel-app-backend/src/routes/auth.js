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
        return res.status(400).json(
            { isSuccess: false, message: 'Wrong username or email', accessToken: null, refreshToken: null, username: null, permissionsLevel: doc.permissionsLevel}
        );
    
    try {
        if (!await bcrypt.compare(password, doc.password))
            return res.status(400).json(
                { isSuccess: false, message: 'Wrong password', accessToken: null, refreshToken: null, username: null, permissionsLevel: doc.permissionsLevel }
            );
    }
    catch (e) {
        return res.status(500).json(
            { isSuccess: false, message: 'Failure', accessToken: null, refreshToken: null, username: null, permissionsLevel: doc.permissionsLevel }
        );
    }

    const user = { id: userId };
    const accessToken = token.generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    dbo.getDatabase().collection('RefreshTokens').insertOne({ value: refreshToken });
    res.json(
        { isSuccess: true, message: 'Success', accessToken: accessToken, refreshToken: refreshToken, username: doc.username, permissionsLevel: doc.permissionsLevel }
        );
});

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, address, city, postalCode, country } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const db = dbo.getDatabase();
        
        if (!username || username.length < 3 || validator.contains(username, '@'))
            return res.sendStatus(400);
        if (!email || !validator.isEmail(email))
            return res.sendStatus(400);
        if (!password || password.length < 8)
            return res.sendStatus(400);
        if (!firstName || firstName.length < 2)
            return res.sendStatus(400);
        if (!lastName || lastName.length < 2)
            return res.sendStatus(400);
        if (!address || address.length < 3)
            return res.sendStatus(400);
        if (!city || city.length < 2)
            return res.sendStatus(400);
        if (!postalCode || postalCode.length < 4)
            return res.sendStatus(400);
        if (!country || country.length < 2)
            return res.sendStatus(400);
    
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
            permissionsLevel: "USER"
        });

        res.status(204).send(`User ${req.body.username} has been registred`);
    }
    catch (e) {
        console.log(e);
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