import axios from "axios";

export const signUpUser = (user) => {
  console.log("axios");
  return axios
    .post("http://localhost:8000/users/signup", user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => alert(error.response));
};

export const loginUser = (user) => {
  return axios
    .post("http://localhost:8000/users/login", user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => alert(error.response.data));
};

export const getBasicUserInfo = (token) => {
  return axios

    .get("http://localhost:8000/users/myPage", { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      return response;
    })
    .catch((error) => alert(error.response));
};

export const editUserInfo = (token, user) => {
  return axios
    .put(`http://localhost:8000/users/myPage/`, user, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};
