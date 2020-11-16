import { produce } from "immer";
import { SHOW_ALL_USERS_SUCCESS, SHOW_USER_BY_NAME_SUCCESS, ADD_NEW_USER_SUCCESS, SHOW_ALL_USERS, DELETE_USER, DELETE_USER_SUCCESS } from "./constants";

const initialState = {
    users: [],
    userAdded: false,
    userLoadingCompleted: false,
    isSearched: false
}

export default function Reducer(state = initialState, action: any) {
    return produce(state, (draft) => {
        switch (action.type) {
            case SHOW_ALL_USERS_SUCCESS:
                draft.users = action.payload;
                draft.userLoadingCompleted = true;
                draft.isSearched = false;
                break;
            case SHOW_USER_BY_NAME_SUCCESS:
                console.log(action.payload);
                draft.users = action.payload;
                draft.isSearched = true;
                break;
            case ADD_NEW_USER_SUCCESS:
                draft.userAdded = true;
                break;
            case DELETE_USER_SUCCESS:
                console.log(action.payload, "delete data");
                draft.users = action.payload;
                break;
            default:
                break;
        }
    });
}