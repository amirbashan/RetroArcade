const express = require("express");
const router = express.Router();
const { addScore, getTop10Time, getTop10Score, getChartData, getGames } = require("../data/scores");
const { validateBody } = require("../middleware/validateBody");
const { checkToken } = require("../middleware/checkToken");
const { checkIfAdmin } = require("../middleware/checkIfAdmin");
const Schemas = require("../schemas/allSchemas");

router.post("/", checkToken, validateBody(Schemas.postScore), async (req, res) => {
  const { game, score, lvl } = req.body;
  const id = req.body.decodedToken.id;
  const response = await addScore(id, game, score, lvl);
  res.send(response);
});

router.get("/snake", async (req, res) => {
  const { lvl } = req.query;
  const game = "Snake";
  const response = await getTop10Score(game, lvl);
  res.send(response);
});

router.get("/minesweeper", async (req, res) => {
  const { lvl } = req.query;
  const game = "Minesweeper";
  const response = await getTop10Time(game, lvl);
  res.send(response);
});

router.get("/Traffic", checkToken, checkIfAdmin, async (req, res) => {
  const { game } = req.query;
  const response = await getChartData(game);
  res.send(response);
});

router.get("/games", async (req, res) => {
  const response = await getGames();
  res.send(response);
});

module.exports = router;
