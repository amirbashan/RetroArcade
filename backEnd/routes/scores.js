const express = require("express");
const router = express.Router();
const { checkToken } = require("../middleware/checkToken");
const { addScore, getTop10Time, getTop10Score } = require("../data/scores");

router.post("/", checkToken, async (req, res) => {
  const { game, score, lvl } = req.body;
  const id = req.body.decodedToken.id;
  const response = await addScore(id, game, score, lvl);
  res.send(response);
});

router.get("/top10/snake", async (req, res) => {
  const { game, lvl } = req.query;
  const response = await getTop10Time(game, lvl);
  res.send(response);
});

router.get("/top10/minesweeper", async (req, res) => {
  const { game, lvl } = req.query;
  const response = await getTop10Score(game, lvl);
  res.send(response);
});

module.exports = router;
