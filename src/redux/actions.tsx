import { SHOW_ALL_USERS, SHOW_USER_BY_NAME, SHOW_ALL_USERS_SUCCESS, SHOW_USER_BY_NAME_SUCCESS, ADD_NEW_USER_SUCCESS, ADD_NEW_USER, DELETE_USER, DELETE_USER_SUCCESS } from "./constants";
import { UserDetails } from "../App";

export const getAllUsers = () => ({
    type: SHOW_ALL_USERS,
});

export const getAllUsersSuccess = (users: Array<UserDetails>) => ({
    type: SHOW_ALL_USERS_SUCCESS,
    payload: users
});

export const getUserByName = (name: string) => ({
    type: SHOW_USER_BY_NAME,
    payload: {
        "name": name
    }
});

export const getUserByNameSuccess = (user: UserDetails) => ({
    type: SHOW_USER_BY_NAME_SUCCESS,
    payload: user
});

export const AddUser = (user: UserDetails) => ({
    type: ADD_NEW_USER,
    payload: user
});

export const AddUserSuccess = (message: string) => ({
    type: ADD_NEW_USER_SUCCESS,
    payload: message
});

export const DeleteUser = (id: number) => ({
    type: DELETE_USER,
    payload: id
});

export const DeleteUserSucess = (users: Array<UserDetails>) => ({
    type: DELETE_USER_SUCCESS,
    payload: users
});