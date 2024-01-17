const { MongoClient } = require("mongodb");

// URL to connect to MongoDB Atlas
const Db = process.env.ATLAS_URI;

// MongoDB Client with the specified URL
const client = new MongoClient(Db, {});

// Variable to hold the database connection
var _db;

module.exports = {
    /**
     * Connects to the MongoDB server and sets the database connection.
     *
     * @param {Function} callback - A callback function that is called after connecting to the MongoDB server.
     */
    connectToServer: async (callback) => {
        await client.connect();
        console.log("Connected successfully to server");
        _db = client.db("travelAdvisor");
        console.log("Successfully connected to MongoDB");

        // Execute the callback function if provided
        if (callback) {
            callback();
        }
    },

    /**
     * Gets the database connection.
     *
     * @returns {Object} The database connection object.
     */
    getDb: function () {
        return _db;
    },
};
