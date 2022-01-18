import axios from "axios";

export const submitScoreMinesweeper = (token, data) => {
  return axios

    .post("http://localhost:8000/scores", data, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      return response;
    })
    .catch((error) => alert(error.response));
};

export const getTopMinesweepers = (lvl) => {
  return axios

    .get(`http://localhost:8000/scores/minesweeper/?lvl=${lvl}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => alert(error.response));
};
