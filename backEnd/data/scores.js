const { query } = require("../lib/db");

async function addScore(id, game, score, lvl) {
  try {
    const sql = `INSERT INTO highscore (userId, game,difficulty, score) VALUES ('${id}', '${game}','${lvl}','${score}'`;
    const response = await query(sql);
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function getTop10Time(game, lvl) {
  try {
    const sql = `SELECT * FROM highscore WHERE game='${game}' AND difficulty LIKE '${lvl}' ORDER BY score DESC LIMIT 10;`;
    const response = await query(sql);
    return response;
  } catch (err) {
    console.error(err);
  }
}
async function getTop10Score(game, lvl) {
  try {
    const sql = `SELECT * FROM highscore WHERE game='${game}' AND difficulty LIKE '${lvl}' ORDER BY score LIMIT 10;`;
    const response = await query(sql);
    return response;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { addScore, getTop10Time, getTop10Score };
