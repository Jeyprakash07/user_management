import { SHOW_ALL_USERS, SHOW_USER_BY_ID, SHOW_ALL_USERS_SUCCESS, SHOW_USER_BY_ID_SUCCESS, ADD_NEW_USER_SUCCESS, ADD_NEW_USER } from "./constants";
import { UserDetails } from "../App";

export const getAllUsers = () => ({
    type: SHOW_ALL_USERS,
});

export const getAllUsersSuccess = (users: Array<UserDetails>) => ({
    type: SHOW_ALL_USERS_SUCCESS,
    payload: users
});

export const getUserById = (id: number) => ({
    type: SHOW_USER_BY_ID,
    payload: {
        "id": id
    }
});

export const getUserByIdSuccess = (user: UserDetails) => ({
    type: SHOW_USER_BY_ID_SUCCESS,
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