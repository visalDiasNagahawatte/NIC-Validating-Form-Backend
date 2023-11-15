const express = require("express");
const router = express.Router();
const { UsersDetails, sequelize } = require("../models");

// Route to create a new UserDetails record
router.post("/data", async (req, res) => {
  try {
    // Create a new UserDetails record in the database
    const usersDetails = await UsersDetails.create(req.body);

    // Respond with the created UserDetails record
    res.status(201).json(usersDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create UserDetails record." });
  }
});

// Route to retrieve a single UserDetails record by userId from the URL
router.get("/data/:userId", async (req, res) => {
  const userId = req.params.userId; // Retrieve userId from the URL

  try {
    // Retrieve a UserDetails record with the specified userId from the database
    const userDetails = await UsersDetails.findOne({
      where: { userId: userId },
    });

    if (userDetails) {
      // Respond with the retrieved UserDetails record
      res.status(200).json(userDetails);
    } else {
      // If no record was found, return a not found status code
      res.status(404).json({ error: "UserDetails record not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to retrieve UserDetails record." });
  }
});

// Route to delete a UserDetails record by userId
router.delete("/data/:userId", async (req, res) => {
  const userId = req.params.userId; // Retrieve userId from the URL

  try {
    // Find the UserDetails record with the specified userId
    const userDetails = await UsersDetails.findOne({
      where: { userId: userId },
    });

    if (userDetails) {
      // If a record is found, delete it
      await userDetails.destroy();
      res.status(204).send(); // Respond with a 204 status (No Content) indicating success
    } else {
      // If no record was found, return a not found status code
      res.status(404).json({ error: "UserDetails record not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to delete UserDetails record." });
  }
});

router.get("/all", async (req, res) => {
  try {
    const userdetails = await UsersDetails.findAll();
    res.status(200).json(userdetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching user details records.",
    });
  }
});

// Route to update a UserDetails record by userId
router.put("/data/:userId", async (req, res) => {
  const userId = req.params.userId; // Retrieve userId from the URL

  try {
    // Find the UserDetails record with the specified userId
    const userDetails = await UsersDetails.findOne({
      where: { userId: userId },
    });

    if (userDetails) {
      // Update the UserDetails record with the data from the request body
      await userDetails.update(req.body);
      res.status(200).json(userDetails); // Respond with the updated UserDetails record
    } else {
      // If no record was found, return a not found status code
      res.status(404).json({ error: "UserDetails record not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update UserDetails record." });
  }
});

router.get("/service-providers-count", async (req, res) => {
  try {
    const serviceProvidersCount = await UsersDetails.findAll({
      attributes: [
        "service_provider",
        [sequelize.fn("COUNT", "service_provider"), "count"],
      ],
      group: ["service_provider"],
    });

    res.status(200).json(serviceProvidersCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching service provider counts.",
    });
  }
});

// Add this route to your Express application
router.get("/gender-count", async (req, res) => {
  try {
    const genderCount = await UsersDetails.findAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("gender")), "count"],
        "gender",
      ],
      group: ["gender"],
    });

    res.status(200).json(genderCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching gender counts.",
    });
  }
});

module.exports = router;
