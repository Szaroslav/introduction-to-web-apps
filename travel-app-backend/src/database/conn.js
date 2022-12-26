const { MongoClient } = require('mongodb');
const connString = 'mongodb+srv://szary:LULi2tq7xYJLr5T@wdai-travel-app.m5kjkoq.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(connString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let dbConn;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db)
                return callback(err);

            
            dbConn = db.db('travel-app');
            return callback();
        });
    },

    getDatabase: function () {
        return dbConn;
    }
};