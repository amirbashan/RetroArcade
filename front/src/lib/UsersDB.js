import axios from "axios";
const URL = "http://localhost:8000";

export const signUpUser = (user) => {
  return axios
    .post(`${URL}/users/signup`, user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => alert(error.response));
};

export const loginUser = (user) => {
  return axios
    .post(`${URL}/users/login`, user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => alert(error.response.data));
};

export const getBasicUserInfo = (token) => {
  return axios

    .get(`${URL}/users/myPage`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      return response;
    })
    .catch((error) => alert(error.response));
};

export const editUserInfo = (token, user) => {
  return axios
    .put(`${URL}/users/myPage/`, user, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

export const getUsersTableInfo = (token) => {
  return axios

    .get(`${URL}/users/fullUserList`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => alert(error.response));
};
