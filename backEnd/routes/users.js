const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { addUser, getUserByEmail, getFullUsersList, getUserFullInfo, editUser } = require("../data/users");
// const { checkToken } = require("../middleware/checkToken");
// const { validateBody } = require("../middleware/validateBody");
// const { preventDuplicateUsers } = require("../middleware/preventDuplicateUsers");
// const { encryptPassword } = require("../middleware/encryptPassword");
// const { doesUserExist } = require("../middleware/doesUserExist");
// const { checkIfAdmin } = require("../middleware/checkIfAdmin");

// const Schemas = require("../schemas/allSchemas");

// router.post("/signup", validateBody(Schemas.signUpSchema), preventDuplicateUsers, encryptPassword, async (req, res) => {
//   try {
//     const { id, email, password, name } = req.body;
//     const user = await addUser(email, password, first_name, last_name, phone);
//     res.send("Signup Successful, please log in");
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/login", validateBody(Schemas.loginSchema), doesUserExist, async (req, res) => {
//   try {
//     const { email, password, user } = req.body;
//     bcrypt.compare(password, user.password, (err, result) => {
//       if (err) {
//         res.status(400).send("Incorrect Password");
//         return;
//       }
//       if (result) {
//         const token = jwt.sign({ id: user.email }, process.env.SECRET_KEY, { expiresIn: "24h" });
//         res.send({ email, token });
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
