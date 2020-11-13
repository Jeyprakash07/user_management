import { produce } from "immer";
import { SHOW_ALL_USERS_SUCCESS, SHOW_USER_BY_ID_SUCCESS, ADD_NEW_USER_SUCCESS, SHOW_ALL_USERS } from "./constants";

const initialState = {
    users: [],
    userAdded: false,
    userLoadingCompleted: false
}

export default function Reducer(state = initialState, action: any) {
    return produce(state, (draft) => {
        switch (action.type) {
            case SHOW_ALL_USERS_SUCCESS:
                draft.users = action.payload;
                draft.userLoadingCompleted = true;
                break;
            case SHOW_USER_BY_ID_SUCCESS:
                draft.users = action.payload;
                break;
            case ADD_NEW_USER_SUCCESS:
                draft.userAdded = true;
                break;
            default:
                break;
        }
    });
}