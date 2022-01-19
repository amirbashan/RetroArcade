const { query } = require("../lib/db");

async function addScore(id, game, score, lvl) {
  try {
    const sql = `INSERT INTO highscore (userId, game,difficulty, score) VALUES ('${id}', '${game}','${lvl}','${score}');`;
    const response = await query(sql);
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function getTop10Time(game, lvl) {
  try {
    const sql = `SELECT name,score,avatar FROM highscore JOIN users on highscore.userId=users.id WHERE game='${game}' AND difficulty LIKE '${lvl}' ORDER BY score LIMIT 10;`;
    const response = await query(sql);
    return response;
  } catch (err) {
    console.error(err);
  }
}
async function getTop10Score(game, lvl) {
  try {
    const sql = `SELECT name,score,avatar FROM highscore JOIN users on highscore.userId=users.id WHERE game='${game}' AND difficulty LIKE '${lvl}' ORDER BY score DESC LIMIT 10;`;
    const response = await query(sql);
    return response;
  } catch (err) {
    console.error(err);
  }
}

async function getChartData(game) {
  try {
    const sql = `SELECT created_date,count(created_date) as counter ,max(game) FROM highscore WHERE game LIKE '${game}' group by created_date ORDER BY created_date;`;
    const response = await query(sql);
    return response;
  } catch (err) {
    console.error(err);
  }
}
async function getGames() {
  try {
    const sql = `SELECT game FROM highscore GROUP BY game;`;
    const response = await query(sql);
    return response;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { addScore, getTop10Time, getTop10Score, getChartData, getGames };
