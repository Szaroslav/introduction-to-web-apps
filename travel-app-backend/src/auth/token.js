require('dotenv').config();

const jwt = require('jsonwebtoken');

const generateAccessToken = user => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2.5m' });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.sendStatus(401);
        
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        
        req.user = user;
        next();
    })
};

module.exports = {
    generateAccessToken: generateAccessToken,
    authenticateToken: authenticateToken
};