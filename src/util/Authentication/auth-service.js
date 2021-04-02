import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
const API_FACEBOOK_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      console.log("ELOO"+response.data.username);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const facebookLogin = (accessToken) => {
  return axios
    .post(API_FACEBOOK_URL + "facebook/signin", {
      accessToken,
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
}

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  facebookLogin,
  logout,
  getCurrentUser
};