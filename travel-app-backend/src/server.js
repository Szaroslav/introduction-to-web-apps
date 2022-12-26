require('dotenv').config({ path: './config.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tripsRouter = require('./routes/trips');
const dbo = require('./database/conn');

const app = express();
const PORT = process.env.PORT || 2137;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/trips', tripsRouter);

dbo.connectToServer(function (err) {
    if (err) {
        console.log(err);
        process.exit();
    }

    app.listen(PORT);
});