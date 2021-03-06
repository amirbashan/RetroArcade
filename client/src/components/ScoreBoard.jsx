import React from "react";
import { Avatar, Text } from "@chakra-ui/react";

export default function ScoreBoard(props) {
  const { scoresArray, scoreType } = props;
  return (
    <div className="d-flex form-row  flex-column  mx-1 justify-content-center align-items-center">
      <Text fontSize="4xl">
        👑 <u>TOP10</u> 👑
      </Text>

      <table className="table border">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#RANK</th>
            <th scope="col"></th>
            <th scope="col">User</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {scoresArray.map((row, i) => {
            return (
              <tr key={i}>
                <th scope="row">-{i + 1}-</th>
                <td>
                  <Avatar size="xs" name={row.name} src={row.avatar} />
                </td>
                <td>{row.name}</td>
                <td>
                  {row.score} {scoreType}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
