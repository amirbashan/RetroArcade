import axios from "axios";
const URL = "http://localhost:8000";

export const submitScore = (token, data) => {
  return axios

    .post(`${URL}/scores`, data, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      return response;
    })
    .catch((error) => alert(error.response));
};

export const getTopMinesweepers = (lvl) => {
  return axios

    .get(`${URL}/scores/minesweeper/?lvl=${lvl}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => alert(error.response));
};

export const getTopSnake = (lvl) => {
  return axios

    .get(`${URL}/scores/Snake/?lvl=${lvl}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => alert(error.response));
};
