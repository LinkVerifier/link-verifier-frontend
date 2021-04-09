import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
const API_FACEBOOK_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password, creationDate) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    creationDate,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const facebookLogin = (accessToken, creationDate) => {
  return axios
    .post(API_FACEBOOK_URL + "facebook/signin", {
      accessToken,
      creationDate,
    })
    .then((response) => {
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

const authService = {
  register,
  login,
  facebookLogin,
  logout,
  getCurrentUser
};

export default authService;