require('dotenv').config();

const express = require('express');
const authRouter = require('./routes/auth');
const tripsRouter = require('./routes/trips');
const dbo = require('./database/conn');

const app = express();
const PORT = process.env.PORT || 2137;

app.use(express.json());

app.use('/auth', authRouter);
app.use('/trips', tripsRouter);

dbo.connectToServer(function (err) {
    if (err) {
        console.log(err);
        process.exit();
    }
    
    app.listen(PORT);
});