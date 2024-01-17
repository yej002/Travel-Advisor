const express = require('express');
const  { ObjectId } = require("mongodb");
const dbo = require("../db/conn");
const multer = require('multer');
const router = express.Router();

// Set up multer memory storage to store files as buffers
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Route to get a list of all travelogues, sorted by likes in descending order.
 * GET /
 *
 * @async
 * @returns {JSON} The list of travelogues.
 */
router.get("/", async (req, res) => {
    try {
        const dbConnect = dbo.getDb();
        const travelogues = await dbConnect.collection("travelogues")
            .find({})
            .sort({ likes: -1 }) // This sorts the documents by likes in descending order
            .toArray();
        res.json(travelogues);
    } catch (e) {
        res.status(500).send('Error occurred: ' + e.message);
    }
    
});

/**
 * Route to get the top 5 most popular cities based on the number of travelogues.
 * GET /popular
 *
 * @async
 * @returns {JSON} A list of the top 5 cities and their travelogue counts.
 */
router.get("/popular", async (req, res) => {
    try {
        const dbConnect = dbo.getDb();
        const topCities = await dbConnect.collection('travelogues').aggregate([
            {
                $group: {
                    _id: '$city', // Group by city
                    count: { $sum: 1 } // Count the number of documents for each city
                }
            },
            { $sort: { count: -1 } }, // Sort by count in descending order
            { $limit: 5 } // Limit to top 5
        ]).toArray();
        res.json(topCities);
    } catch (e) {
        res.status(500).send('Error occurred: ' + e.message);
    }
})

/**
 * Route to get a list of travelogues by city name.
 * GET /city/:city
 *
 * @async
 * @param {Object} req - The request object, containing city as a parameter.
 * @param {Object} res - The response object.
 * @returns {JSON} A list of travelogues for the specified city.
 */
router.get("/city/:city", async (req, res) => {
    try {
        const dbConnect = dbo.getDb();
        const city = req.params.city;
        if (!city) {
            return res.status(400).send('City parameter is required');
        }
        const items = await dbConnect.collection("travelogues").find({city: { $regex: new RegExp(city, "i") }}).toArray();
        res.json(items);

    } catch (e) {
        res.status(500).send('Error occurred: ' + e.message);
    }

});

/**
 * Route to get a specific travelogue by ID.
 * GET /:id
 *
 * @async
 * @param {Object} req - The request object, containing the ID parameter.
 * @param {Object} res - The response object.
 * @returns {JSON} The travelogue with the specified ID.
 */
router.get("/:id", async (req, res) => {
  try {
      const id = req.params.id;

      // Check if the provided string is a valid ObjectId
      if (!ObjectId.isValid(id)) {
          return res.status(400).send('Invalid ID format');
      }

      const dbConnect = dbo.getDb();
      const travelogue = await dbConnect.collection('travelogues').findOne({ _id: new ObjectId(id) });

      if (!travelogue) {
          return res.status(404).send('Travelogue not found');
      }

      res.json(travelogue);
  } catch (error) {
      console.error('Error retrieving travelogue:', error);
      res.status(500).send('Internal Server Error');
  }
});

/**
 * Route to create a new travelogue record, with multiple images.
 * POST /newtravelogue
 *
 * @async
 * @param {Object} req - The request object, containing travelogue data and image files.
 * @param {Object} res - The response object.
 * @returns {JSON} The newly created travelogue record.
 */
router.post('/newtravelogue', upload.array('images', 10), async (req, res) => {
    try {
      const dbConnect = dbo.getDb();
  
      // Convert uploaded images to BSON Binary type
      const images = req.files.map(file => ({
        data: Buffer.from(file.buffer),
        contentType: file.mimetype,
        filename: file.originalname
      }));
  
      let newTravelogue = {
        title: req.body.title,
        author: req.body.author || "Anonymous",
        images: images, // Images stored as an array of buffers
        description: req.body.description,
        city: req.body.location,
        likes: 0
      };
  
      let result = await dbConnect.collection("travelogues").insertOne(newTravelogue);
      // Use `insertedId` to get the ID of the inserted document
      newTravelogue._id = result.insertedId;
      res.status(201).json(newTravelogue);  // Send the inserted document back
    } catch (error) {
      console.error("Error inserting new travelogue: ", error);
      res.status(500).send("Internal Server Error");
    }
});


/**
 * Route to update the 'likes' of a specific travelogue by ID.
 * PUT /likes/:id
 *
 * @async
 * @param {Object} req - The request object, containing the ID parameter and new likes count.
 * @param {Object} res - The response object.
 * @returns {String} A success message if the update is successful.
 */
router.put('/likes/:id', async (req, res) => {
  try {
      const dbConnect = dbo.getDb();
      const travelogueId = req.params.id;

      if (!ObjectId.isValid(travelogueId)) {
          return res.status(400).send('Invalid ID format');
      }

      const updatedData = {
          $set: {
              likes: req.body.likes
          }
      };

      const result = await dbConnect.collection("travelogues").updateOne(
          { _id: new ObjectId(travelogueId) },
          updatedData
      );
      if (result.matchedCount === 0) {
          return res.status(404).send('No travelogue found with the provided ID');
      }

      res.status(200).send('Travelogue likes updated successfully');
  } catch (error) {
      console.error("Error updating travelogue: ", error);
      res.status(500).send("Internal Server Error");
  }
});

module.exports = router;