const { Users } = require("../models");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if required fields are not empty
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if the user already exists with the same username or email
    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this username or email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await Users.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json("Signup Successful");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const user = await Users.findOne({ where: { email: email } });

  if (!user) {
    res.json({ error: "User Dosen't Exist" });
    return;
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.json({ error: "Wrong User Name and Password Combination" });
    } else {
      const accessToken = sign(
        { username: user.username, id: user.userid },
        "importantsecret"
      );
      res.json({ accessToken, userId: user.userid });
    }
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findOne({
      where: { userId: userId },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user details." });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user records." });
  }
});

router.delete("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find and delete the user with the specified userId
    const deletedUser = await Users.destroy({
      where: { userId: userId },
    });

    if (deletedUser) {
      res.status(204).send(); // Respond with a 204 status (No Content) indicating success
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to delete user." });
  }
});

module.exports = router;
