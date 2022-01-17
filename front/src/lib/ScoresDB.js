import axios from "axios";

export const submitScoreMinesweeper = (token, data) => {
  return axios

    .post("http://localhost:8000/scores", data, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      return response;
    })
    .catch((error) => alert(error.response));
};
