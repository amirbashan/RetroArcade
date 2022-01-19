import axios from "axios";

export const submitScore = (token, data) => {
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

export const getTopSnake = (lvl) => {
  return axios

    .get(`http://localhost:8000/scores/Snake/?lvl=${lvl}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => alert(error.response));
};
