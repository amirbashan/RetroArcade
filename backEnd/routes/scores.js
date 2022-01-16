const express = require("express");
const router = express.Router();
const { checkToken } = require("../middleware/checkToken");
const { addScore, getTop10 } = require("../data/scores");

router.post("/", checkToken, async (req, res) => {
  const { game, score, lvl } = req.body;
  const id = req.body.decodedToken.id;
  const response = await addScore(id, game, score, lvl);
  res.send(response);
});

router.get("/top10", async (req, res) => {
  const { game, lvl } = req.query;
  const response = await getTop10(game, lvl);
  res.send(response);
});

module.exports = router;
