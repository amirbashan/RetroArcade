const { getUserById } = require("../data/users");

async function checkIfAdmin(req, res, next) {
  const user = await getUserById(req.body.decodedToken.id);
  if (!user.isAdmin) {
    res.status(400).send("Access for Admin only");
    return;
  }
  next();
}

module.exports = { checkIfAdmin };
