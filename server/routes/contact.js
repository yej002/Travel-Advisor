const express = require('express');
const { ObjectId } = require("mongodb");
const dbo = require("../db/conn");
const router = express.Router();

/**
 * Route to get a list of all travelogues.
 * GET /
 *
 * @async
 * @returns {JSON} The list of travelogues.
 */
router.get("/", async (req, res) => {
    try {
        const dbConnect = dbo.getDb();
        const travelogues = await dbConnect.collection("contactUsForm")
            .find({})
            .toArray();
        res.json(travelogues);
    } catch (e) {
        res.status(500).send('Error occurred: ' + e.message);
    }
});

/**
 * Route to create a new contact us record.
 * POST /post
 *
 * @async
 * @param {Object} req - The request object containing form data.
 * @param {Object} res - The response object.
 * @returns {JSON} The newly created contact us record.
 */
router.post('/post', async (req, res) => {
    try {
        const dbConnect = dbo.getDb();

        let newContactUs = {
            subject: req.body.subject,
            email: req.body.email,
            message: req.body.message,
        };

        let result = await dbConnect.collection("contactUsForm").insertOne(newContactUs);
        // Use `insertedId` to get the ID of the inserted document
        newContactUs._id = result.insertedId;
        res.status(201).json(newContactUs);  // Send the inserted document back
    } catch (error) {
        console.error("Error submitting new message: ", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
