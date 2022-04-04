const { getUserByEmail } = require("../data/users");

async function preventDuplicateUsers(req, res, next) {
  const { email } = req.body;
  const user = await getUserByEmail(email);
  if (user) {
    res.status(400).send("User Already Exist");
    return;
  }
  next();
}

module.exports = { preventDuplicateUsers };
