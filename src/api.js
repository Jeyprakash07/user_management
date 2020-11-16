import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
});


export function getAllUsersApi() {
    return API({
        method: "post",
        url: "/get/allusers"
    });
}

export function getUserApi(userName) {
    return API({
        method: "post",
        url: "/get/user",
        data: userName
    });
}


export function addUserApi(details) {
    console.log(details);
    return API({
        method: "get",
        url: "/add/user/" + details.userId + "/" + details.userName + "/" + details.mobileNumber + "/" + details.emailAddress,
    });
}

export function deleteUserApi(id) {
    return API({
        method: "get",
        url: "/delete/user/" + id
    });
}