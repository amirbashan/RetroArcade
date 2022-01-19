import React, { useState, useEffect, useContext } from "react";
import { getChartData, getGameNames } from "../lib/ScoresDB";
import { AppContext } from "../Context/AppContext";
import Chart from "react-google-charts";

export default function Traffic() {
  const { token } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [games, setGames] = useState("%");
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    makeGraph(token, setData, games);
    getGameNames().then((response) => setGamesList(response));
  }, [games, token]);

  const handleGameChange = (e) => {
    e.preventDefault();
    setGames(e.target.value);
    makeGraph(token, setData, games);
  };

  return (
    <>
      <Chart width="100%" height={400} chartType="LineChart" data={data} />
      <select className="form-select mt-3" value={games} aria-label="Default select example" onChange={handleGameChange}>
        <option value="%">All</option>
        {gamesList.map((game) => {
          return (
            <option key={game.game} value={game.game}>
              {game.game}
            </option>
          );
        })}
      </select>
    </>
  );
}

async function makeGraph(token, setData, games) {
  let response = await getChartData(token, games);
  let dataSet = [["Date", "Games Played per day"]];
  for (let dataObj of response) {
    const xAxes = fixData(dataObj.created_date);
    const yAxes = dataObj.counter;
    dataSet.push([xAxes, yAxes]);
  }
  setData(dataSet);
}
const fixData = (date) => {
  const newDate = date.substr(8, 2) + "-" + date.substr(5, 2) + "-" + date.substr(0, 4);
  return newDate;
};
