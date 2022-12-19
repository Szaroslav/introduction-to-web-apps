const express = require('express');
const app = express();
const tripsRouter = require('./routes/trips');

app.use('/trips', tripsRouter);

app.listen(3000);