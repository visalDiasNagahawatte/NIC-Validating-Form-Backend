const express = require("express");
const router = express.Router();
const { Users, UsersDetails } = require("../models");

router.get("/all", async (req, res) => {
  try {
    const combinedData = await Users.findAll({
      include: UsersDetails,
    });

    res.status(200).json(combinedData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching combined data." });
  }
});

module.exports = router;
