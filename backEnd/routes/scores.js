const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  //   const res = await getAll();
  res.send(res);
});

module.exports = router;
