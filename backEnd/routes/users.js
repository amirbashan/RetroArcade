const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { addUser, getUserById, editUser } = require("../data/users");
const { checkToken } = require("../middleware/checkToken");
const { validateBody } = require("../middleware/validateBody");
const { preventDuplicateUsers } = require("../middleware/preventDuplicateUsers");
const { encryptPassword } = require("../middleware/encryptPassword");
const { doesUserExist } = require("../middleware/doesUserExist");
// const { checkIfAdmin } = require("../middleware/checkIfAdmin");

const Schemas = require("../schemas/allSchemas");

router.post("/signup", validateBody(Schemas.signUpSchema), preventDuplicateUsers, encryptPassword, async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await addUser(email, password, name);
    res.send("Signup Successful, please log in");
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", validateBody(Schemas.loginSchema), doesUserExist, async (req, res) => {
  try {
    const { email, password, user } = req.body;
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(400).send("Incorrect Password");
        return;
      }
      if (result) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "24h" });
        res.send({ token });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/myPage", checkToken, async (req, res) => {
  try {
    const id = req.body.decodedToken.id;
    const user = await getUserById(id);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

router.put("/myPage", checkToken, async (req, res) => {
  try {
    const id = req.body.decodedToken.id;
    const { email, name, avatar } = req.body;
    const user = await editUser(id, email, name, avatar);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
