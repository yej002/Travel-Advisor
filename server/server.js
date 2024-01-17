const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require("dotenv").config({ path: "./config.env" });
const dbo = require("./db/conn");
const travelogueRoute = require('./routes/travelogue');

app.use(cors());

app.use(express.json());

/**
 * GET route for the index page.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get('/index', (req, res) => {
    res.send('Hello from Express!');
});

app.use('/travelogue', travelogueRoute);

/**
 * GET route to retrieve all travelogue data from the database.
 *
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get('/get-data', async (req, res) => {
    try {
        const dbConnect = dbo.getDb();
        const items = await dbConnect.collection("travelogues").find({}).toArray();
        res.json(items);
    } catch (e) {
        res.status(500).send('Error occurred: ' + e.message);
    }
});

app.use(express.static(path.join(__dirname, 'build')));

/**
 * Route to serve the front-end application from the 'build' directory for any other routes.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    // perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    });
    console.log(`Server is running on port: ${PORT}`);
});
