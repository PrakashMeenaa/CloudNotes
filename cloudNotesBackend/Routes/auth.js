const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchdata = require("../Middleware/FetchData");

const JWT_SECRET = "ffga223bcakjnw3";

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid name").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "this email has been already used" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ authtoken });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }

    const comparedpas = await bcrypt.compare(password, user.password);
    if (!comparedpas) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({ authtoken });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/data", fetchdata, async (req, res) => {
  try {
    userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
