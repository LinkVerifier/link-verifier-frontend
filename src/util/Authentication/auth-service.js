import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";
const API_FACEBOOK_URL = "http://localhost:8080/auth/";

const register = (username, email, password, passwordConfirmation, creationDate) => {
    return axios.post(API_URL + "auth/signup", {
        username,
        email,
        password,
        passwordConfirmation,
        creationDate,
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "auth/signin", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }
            return response.data;
        });
};

const facebookLogin = (accessToken, creationDate) => {
    console.log(creationDate);
    return axios
        .post(API_FACEBOOK_URL + "facebook/signin", {
            accessToken,
            creationDate,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("token");
};

const getCurrentUser = () => {
    return axios
        .get(API_URL + `users/get_user`, {
            headers: authHeader(),
        })
        .then((response) => {
            // console.log(response.data);
            return response.data;
        })
        .catch((err) => {
            return null;
        });
};

const authService = {
    register,
    login,
    facebookLogin,
    logout,
    getCurrentUser,
};

export default authService;
