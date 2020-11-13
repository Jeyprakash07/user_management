import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
});


export function getAllUsers() {
    return API({
        method: "post",
        url: "/get/allusers"
    });
}

export function getUser(userIdDetails) {
    return API({
        method: "post",
        url: "/get/allusers"
    });
}


export function addUser(details) {
    console.log(details);
    return API({
        method: "get",
        url: "/add/user/" + details.userId + "/" + details.userName + "/" + details.mobileNumber + "/" + details.emailAddress,
    });
}