import React, { useState, useEffect, useContext } from "react";
import { getChartData, getGameNames } from "../lib/ScoresDB";
import { AppContext } from "../Context/AppContext";
import Chart from "react-google-charts";
import { Heading } from "@chakra-ui/react";

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
    <div className="d-flex flex-column w-75 m-auto px-5">
      <Heading>
        <u>Games entry's for: {games === "%" ? "All" : games}</u>
      </Heading>
      <select className="form-select w-50 m-auto my-2" value={games} aria-label="Default select example" onChange={handleGameChange}>
        <option value="%">All</option>
        {gamesList.map((game) => {
          return (
            <option key={game.game} value={game.game}>
              {game.game}
            </option>
          );
        })}
      </select>
      <Chart width="100%" height={400} chartType="LineChart" data={data} />
    </div>
  );
}

async function makeGraph(token, setData, games) {
  let response = await getChartData(token, games);
  let dataSet = [["Date", "Records added\n( that day )"]];
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
