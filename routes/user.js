const router = require("express").Router();
const { User } = require("../models/index");
const { signToken } = require("../utils/auth");


// CREATE A NEW USER
router.post("/", async (req, res) => {

  try {
    const userData = await User.create(req.body);

    const token = signToken(userData);
    res.status(200).json({ token, userData });
  } catch (err) {
    res.status(400).json(err);
  }
});

// LOGIN A USER
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect password, please try again" });
      return;
    }

    const token = signToken(userData);
    res.status(200).json({ token, userData });
  } catch (err) {
    res.status(400).json(err);
  }
});

// LOGOUT A USER
router.post("/logout", (req, res) => {
  res.status(204).end();
});

module.exports = router;
