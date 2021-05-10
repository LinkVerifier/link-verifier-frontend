import axios from "axios";
import authHeader from "./Authentication/auth-header"

const API_URL = "http://localhost:8080/";
const token = localStorage.getItem('token');
// POST

const link = (linkName, deliveryDate) => {
    return axios
        .post(API_URL + "links", {
            linkName,
            deliveryDate,
        })
        .then((response) => {
            return response.data;
        });
};

const newComment = (id, comment, date, opinion) => {
    return axios
        .post(API_URL + `links/${id}/comments`, {
            comment,
            date,
            opinion
        },{
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

// GET

const getLinkById = (id) => {
    return axios
        .get(API_URL + `links/${id}`)
        .then((response) => {
            return response.data;
        });
};

const getLinkByCommentId = (id) => {
    return axios
        .get(API_URL + `links/?commentId=${id}`)
        .then((response) => {
            return response.data;
        });
};


const getUserById = (id) => {
    return axios
        .get(API_URL + `users/${id}`)
        .then((response) => {
            return response.data;
        });
};

const getUserByCommentId = (id) => {
    return axios
        .get(API_URL + `users/?commentId=${id}`)
        .then((response) => {
            return response.data;
        });
};

const getStatistics = () => {
    return axios
        .get(API_URL + `statistics`)
        .then((response) => {
            return response.data;
        });
};

const getDetailsLinks = (search, to) => {
    return axios
        .get(API_URL + `links?search=${search}&to=${to}`)
        .then((response) => {
            return response.data;
        });
};

const getRecentComments = (search, to) => {
    return axios
        .get(API_URL + `comments?search=${search}&to=${to}`)
        .then((response) => {
            return response.data;
        });
};

// PUT

const putConfirmProfile = (userId, token) => {
    return axios
        .put(API_URL + `auth/signup/confirm?userId=${userId}&token=${token}`)
        .then((response) => {
            console.log(response.data);
            return response.data;
        });
};

const putLike = (id) => {
    return axios
        .put(API_URL + `comments/${id}/like`,{},
        {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

const putDisLike = (id) => {
    return axios
        .put(API_URL + `comments/${id}/dislike`,{},
        {
            headers: authHeader()
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        });
};

const putFile = (file) => {
    let data = new FormData();
    data.append('file', file);
    return axios
        .put(API_URL + `files/upload`, data,
        {
            headers:{ 'content-type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token
                    }
        })
        .then((response) => {
            return response.data;
        });
};

const putUsername = (username) => {
    console.log(username);
    return axios
        .put(API_URL + `users/change_username`,{
            username
        },{
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

const putChangePassword = (oldPassword, newPassword, newRepeatedPassword) => {
    return axios
        .put(API_URL + `users/change_password`,{
            oldPassword,
            newPassword,
            newRepeatedPassword
        },{
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
};

// DELETE

const deleteComment = (id) => {
    return axios.delete(API_URL + `comments/${id}`, {
        headers: authHeader()
      });
}

// PATCH

const patchLinkAddViews = (id) => {
    return axios
        .patch(API_URL + `links/${id}`)
        .then((response) => {
            return response.data;
        });
};


const api = {
    link,
    newComment,
    getStatistics,
    getLinkById,
    getUserById,
    getUserByCommentId,
    getDetailsLinks,
    getRecentComments,
    putConfirmProfile,
    putLike,
    putDisLike,
    putFile,
    putUsername,
    putChangePassword,
    deleteComment,
    patchLinkAddViews
};
  
export default api;